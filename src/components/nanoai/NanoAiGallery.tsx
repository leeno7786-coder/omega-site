import { useEffect, useRef, useState } from 'react';
import { NANOAI_SCREENSHOTS, NANOAI_WORK_DETAIL, nanoAiImageSource, nanoAiImageSrcSet } from '../../content/nanoaiContent';
import type { NanoAiMedia } from '../../content/nanoaiContent';

export default function NanoAiGallery() {
  const [selected, setSelected] = useState<NanoAiMedia | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <>
      <div className="nanoai-gallery">
        {NANOAI_SCREENSHOTS.map((media, index) => (
          <figure className={`nanoai-gallery__item${index === 0 ? ' nanoai-gallery__item--lead' : ''}`} key={media.slug}>
            <button className="nanoai-gallery__image" type="button" aria-label={`Enlarge ${media.title}`} onClick={() => setSelected(media)}>
              <img src={nanoAiImageSource(media)} srcSet={nanoAiImageSrcSet(media)} sizes={index === 0 ? '(max-width: 1280px) calc(100vw - 48px), 1240px' : '(max-width: 600px) calc(100vw - 48px), (max-width: 1280px) 48vw, 600px'} width={media.width} height={media.height} alt={media.alt} loading="lazy" decoding="async" />
              <span className="nanoai-gallery__zoom" aria-hidden="true">Enlarge ↗</span>
            </button>
            <figcaption><h3>{media.title}</h3><p>{media.caption}</p></figcaption>
          </figure>
        ))}
      </div>
      <button className="nanoai-detail-link" type="button" onClick={() => setSelected(NANOAI_WORK_DETAIL)}>Inspect the research completion detail <span aria-hidden="true">↗</span></button>
      <dialog className="nanoai-lightbox" ref={dialogRef} aria-labelledby="nanoai-lightbox-title" aria-describedby="nanoai-lightbox-caption" onCancel={() => setSelected(null)} onClose={() => setSelected(null)}>
        {selected ? (
          <>
            <div className="nanoai-lightbox__bar"><h2 id="nanoai-lightbox-title">{selected.title}</h2><button type="button" onClick={() => setSelected(null)} autoFocus>Close image <span aria-hidden="true">×</span></button></div>
            <div className="nanoai-lightbox__scroll" tabIndex={0} role="region" aria-label="Full-resolution image"><img src={nanoAiImageSource(selected)} width={selected.width} height={selected.height} alt={selected.alt} /></div>
            <p id="nanoai-lightbox-caption">{selected.caption}</p>
          </>
        ) : null}
      </dialog>
    </>
  );
}
