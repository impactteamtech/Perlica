import DOMPurify from 'dompurify';
import type { Config } from 'dompurify';

/**
 * Sanitize potentially unsafe HTML strings before rendering.
 *
 * Note: Prefer rendering plain text whenever possible. Only use this
 * when HTML markup is required, together with React's
 * `dangerouslySetInnerHTML`, e.g.:
 *
 *   <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlFromApi) }} />
 */
export const sanitizeHtml = (dirty: string, config?: Config): string => {
    if (!dirty) return '';
    return DOMPurify.sanitize(dirty, {
        USE_PROFILES: { html: true },
        ...config,
    });
};
