import { Helmet } from 'react-helmet-async';
import { BlogView } from 'src/sections/blog/view';
import { NameApp } from 'src/data';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Tin tức | {NameApp} </title>
      </Helmet>

      <BlogView />
    </>
  );
}
