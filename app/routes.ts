import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/meetings', 'routes/meetings.tsx'),
  route('/reviews', 'routes/reviews.tsx'),
  route('/guideBooks', 'routes/guideBooks.tsx'),
  route('/login', 'routes/login.tsx'),
  layout('routes/myPage.tsx', [
    ...prefix('/myPage', [
      route('/participated', 'routes/participatedMeeting.tsx'),
      route('/requested', 'routes/requestedMeeting.tsx'),
      route('/created', 'routes/createdMeeting.tsx'),
      route('/reviews', 'routes/myReviews.tsx'),
      route('/wishList', 'routes/wishList.tsx'),
      route('/editProfile', 'routes/editProfile.tsx'),
      route('/notifications', 'routes/myNotifications.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
