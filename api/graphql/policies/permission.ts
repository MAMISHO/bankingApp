/**
 * permission.js
 *
 * A simple policy for implementing RBAC
 *
 */
export const PolicyPermission = {
  checkRole: (roleId: any, permission: any, resource: any) => {
    console.log(`checkPermission() Role Id: ${roleId}, Permission: ${permission}, Resource: ${resource}`);

    // add your RBAC code here and return true for allow or false for disallow

    return true; // allow
  },
};
