// API/src/API/Middleware/AuthChecker.ts
import { AuthChecker } from 'type-graphql';
import { Context } from '../Context';

export const authChecker: AuthChecker<Context> = ({ root, args, context: { user }, info }): boolean => {
  // If no user then no role to check.
  if (!user) return false;
  // Check if user roles include roles.
  if (user) return true;

  // no roles matched, restrict access
  return false;
};
