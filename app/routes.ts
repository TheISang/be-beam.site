import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home/index.tsx'),
  route('/meetings', 'routes/meetings/index.tsx'),
  route('/meeting/:meetingId', 'routes/meetingDetail/index.tsx'),
  route('/reviews', 'routes/reviews/index.tsx'),
  route('/guideBooks', 'routes/guideBooks/index.tsx'),
  route('/guideBook/:guideBookId', 'routes/guideBookDetail/index.tsx'),
  route('/host/:hostId', 'routes/hostDetail/index.tsx'),
  route('/login', 'routes/login/index.tsx'),
  route('/login/callback', 'routes/loginCallback/index.tsx'),
  route('/search', 'routes/search/index.tsx'),
  route('/createMeeting', 'routes/createMeeting/index.tsx'),
  layout('shared/components/layout/myPage.tsx', [
    ...prefix('/myPage', [
      route('/participated', 'routes/participatedMeeting/index.tsx'),
      route('/requested', 'routes/requestedMeeting/index.tsx'),
      route('/created', 'routes/createdMeeting/index.tsx'),
      ...prefix('/reviews', [
        index('routes/myReviews/index.tsx'),
        layout('shared/components/layout/myReview.tsx', [
          route('/written', 'routes/writtenReviews/index.tsx'),
          route('/reviewable', 'routes/reviewableReviews/index.tsx'),
        ]),
      ]),
      layout('shared/components/layout/myLikes.tsx', [
        ...prefix('/likes', [
          index('routes/myLikes/index.tsx'),
          route('/regular', 'routes/regularMeetingLikes/index.tsx'),
          route('/small', 'routes/smallMeetingLikes/index.tsx'),
          route('/review', 'routes/reviewLikes/index.tsx'),
        ]),
      ]),
      route('/following', 'routes/myFollowing/index.tsx'),
      route('/profile', 'routes/myProfile/index.tsx'),
      route('/info', 'routes/myInformation/index.tsx'),
      route('/notifications', 'routes/myNotifications/index.tsx'),
    ]),
  ]),
  layout('shared/components/layout/createdMeetingDetail.tsx', [
    ...prefix('/myPage/created/:meetingId', [
      route('/intro', 'routes/createdMeetingDetailIntro/index.tsx'),
      route('/detail', 'routes/createdMeetingDetailDetail/index.tsx'),
      route('/manage', 'routes/createdMeetingDetailManage/index.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
