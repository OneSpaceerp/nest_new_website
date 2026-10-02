# Nest Software Development company profile

- Nest_Company_Profile.pdf: finished 15-page landscape A4 profile.
- Nest_Company_Profile.html + profile.css: editable, offline layout. Open the HTML in a browser.
- Company_Profile_Copy.md: editable narrative copy.
- assets/: bundled existing website illustrations, logos, and locally cached website fonts. Keep alongside the HTML.
- build-profile.cjs: reproducible source content and layout generator.

Prepared 3 October 2026 from the current website content in src/lib/content.ts, src/lib/stories.ts and src/lib/onespace.ts. Visual references: src/app/globals.css and the supplied company and product assets. No new generated imagery was required. Images are illustrative, not photographs of Nest facilities or completed client projects. No client metrics, credentials, certifications, founding date, or case studies were added without evidence. Service scope and support terms are agreed per proposal.

To regenerate: set PLAYWRIGHT_PATH to an installed Playwright package path, then run node build-profile.cjs from this directory. Chrome must be installed. This uses bundled website assets and cached fonts from the parent project.
