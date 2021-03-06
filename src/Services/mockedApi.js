import propTypes from 'prop-types';

import { useEffect, useState } from 'react';

export function useFetch(userId) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    if (!userId) return setLoading(true);

    const getData = () => {
      fetch('/user/' + userId, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    };

    getData();
  }, [userId]);

  return { data, isLoading, hasError };
}

/**
 * PropTypes useFetch component
 */
useFetch.propTypes = {
  userId: propTypes.number.isRequired,
};
