import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import SearchResults from "@/components/shared/SearchResults";
import GridPostList from "@/components/shared/GridPostList";
import { useGetPosts, useSearchPost } from "@/lib/react-query/queriesAndMutations";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/shared/Loader";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPost(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);


  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = searchValue !== '';

  const shouldSearchPosts = !shouldShowSearchResults && posts?.pages.every(item => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bol md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Popular today</h3>

          <div className="flex-center gap-3 bg-dark-3 rounded-x1 px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>

            <img
              src="/assets/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {
            shouldShowSearchResults
              ? <SearchResults
                  isSearchFetching={isSearchFetching}
                  searchedPosts={searchedPosts}
                />
              : shouldSearchPosts
                ? <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
                : posts.pages.map((item, index) => (
                  <GridPostList key={`page-${index}`} posts={item.documents} />
                ))
          }
        </div>
      </div>
      {
        hasNextPage && !searchValue && (
          <div
            ref={ref}
            className="mt-10"
          >
            <Loader />
          </div>
        )
      }
    </div>
  )
}

export default Explore