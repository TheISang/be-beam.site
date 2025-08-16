import { redirect } from 'react-router';

export function loader() {
  return redirect('/mypage/likes/regular');
}

export default function myReviews() {
  return <div>myReviews</div>;
}
