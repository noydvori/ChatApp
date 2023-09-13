function Search({ doSearch, searchBox }) {
  const search = function () {
    doSearch(searchBox.current.value);
  };

  

  return (
    <div className="form-outline">
      <input
        type="search"
        id="form1"
        className="form-control"
        placeholder="Search here..."
        aria-label="Search"
        onKeyUp={search}
        ref={searchBox}
      />
    </div>
  );
}
export default Search;
