import React from 'react'
import "./UnAuthorised.css";

function UnAuthorised() {
  return (
    <>
    <div class="w3-display-middle">
  <h1 class="w3-jumbo w3-animate-top w3-center"><code>Unauthorized user</code></h1>
  <h3 class="w3-center w3-animate-right">You dont have permission to view this site.</h3>
  <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
  <h6 class="w3-center w3-animate-zoom"><strong>Error Code</strong>: 403 forbidden</h6>
  </div>
    </>
  )
}

export default UnAuthorised