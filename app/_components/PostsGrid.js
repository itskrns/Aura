import Image from 'next/image';
import img from '../../public/file.svg';
import Post from './Post';

export default function PostsGrid() {
  return (
    <div className="grid w-full grid-cols-3">
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
      <Post src={img} />
    </div>
  );
}
