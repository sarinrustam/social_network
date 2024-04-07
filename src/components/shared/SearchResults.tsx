import { Models } from "appwrite";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />

  if (searchedPosts && Boolean(searchedPosts.documents.length)) return (
    <GridPostList posts={searchedPosts.documents} />
  )

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
};

export default SearchResults;