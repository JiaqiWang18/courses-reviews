import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateSearchTerm } from "../actions";

const Search = ({ updateSearchTerm }) => {
  const [term, setTerm] = useState(null);

  useEffect(() => {
    const timeoutid = setTimeout(() => {
      updateSearchTerm(term);
    }, 500);

    return () => {
      clearTimeout(timeoutid);
    };
  }, [term]);

  return (
    <div className="input-group rounded search-wdith">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
};

export default connect(null, { updateSearchTerm })(Search);
