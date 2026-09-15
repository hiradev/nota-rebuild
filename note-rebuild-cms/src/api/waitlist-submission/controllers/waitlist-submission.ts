/**
 *  waitlist-submission controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::waitlist-submission.waitlist-submission',
  ({ strapi }) => ({
    async create(ctx) {
      const honeypot = ctx.request.body?.data?.honeypot;

      // Bots fill every field, including the hidden honeypot. Real users
      // never see it, so a non-empty value means: accept silently, store nothing.
      if (honeypot) {
        ctx.status = 200;
        ctx.body = { data: null };
        return;
      }

      return super.create(ctx);
    },
  })
);
