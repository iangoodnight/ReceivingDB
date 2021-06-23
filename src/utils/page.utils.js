/**
 * Collected page details
 */

module.exports = {
  audit: {
    bodyClass: '',
    description: 'Audit entry details',
    mainClass: 'new',
    path: '/audit/:id',
    page: 'new',
    title: 'Audit | ReceivingDB',
  },
  browse: {
    bodyClass: '',
    description: 'Browse and view filtered receiving log entries by date range',
    mainClass: 'browse',
    path: '/browse',
    page: 'browse',
    title: 'Browse | Receving Log | BANE',
  },
  index: {
    bodyClass: '',
    description: 'Bulk Apothecary/Natural Essentials receiving log',
    mainClass: 'home',
    path: '/',
    page: 'index',
    title: 'ReceivingDB',
  },
  login: {
    bodyClass: 'login',
    description:
      'Login page for Bulk Apothecary/Natural Essentials receiving log',
    mainClass: 'login',
    path: '/login',
    page: 'login',
    title: 'Login | ReceivingDB',
  },
  newEntry: {
    bodyClass: 'new',
    description:
      'Add new entries to the Bulk Apothecary/Natural Essentials receiving log',
    mainClass: 'new',
    path: '/new',
    page: 'new',
    title: 'New Entry | ReceivingDB',
  },
  reset: {
    bodyClass: 'reset',
    description: 'Please reset your password to continue',
    mainClass: 'reset',
    path: '/reset',
    page: 'reset',
    title: 'Password Reset | ReceivingDB',
  },
  search: {
    bodyClass: 'search',
    description: 'Search by date range, purchase order, part number, or vendor',
    mainClass: 'search',
    path: '/search',
    page: 'search',
    title: 'Search | ReceivingDB',
  },
  user: {
    bodyClass: 'user',
    description:
      'Manage users and access for Bulk Apothecary/Natural Essentials ' +
      'receiving log',
    mainClass: 'user',
    path: '/user',
    page: 'user',
    title: 'Users | ReceivingDB',
  },
  userForm: {
    bodyClass: 'user-form',
    description:
      'Edit/create users for Bulk Apothecary/Natural Essentials receiving log',
    mainClass: 'user-form',
    path: '/user/[_id||new]',
    page: 'userForm',
    title: 'Form | Users | ReceivingDB',
  },
  view: {
    bodyClass: 'view',
    description: 'Bulk Apothecary/Natural Essentials receiving log details',
    mainClass: 'view',
    path: '/view',
    page: 'view',
    title: 'View | ReceivingDB',
  },
};
