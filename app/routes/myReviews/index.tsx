import { redirect } from 'react-router';

export function loader() {
  return redirect('/mypage/reviews/written');
}

export default function myReviews() {
  return <div>myReviews</div>;
}
