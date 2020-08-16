<template>
  <mdb-card>
    <mdb-card-header>Call History</mdb-card-header>
    <mdb-card-body>
      <mdb-tbl sm hover>
        <thead class="blue-grey lighten-4">
          <tr>
            <th>Sr.</th>
            <th>Call Start Time</th>
            <th>Call End Time</th>
            <th>DNIS</th>
            <th>CLI</th>
            <th>AgentId</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>24/06/18 05:00 pm</td>
            <td>25/06/18 05:00 pm</td>
            <td>1234</td>
            <td>8879712345</td>
            <td>8080</td>
            <td>Billing Issue</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>24/06/18 05:00 pm</td>
            <td>25/06/18 05:00 pm</td>
            <td>1234</td>
            <td>8879712345</td>
            <td>8080</td>
            <td>Billing Issue</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>24/06/18 05:00 pm</td>
            <td>25/06/18 05:00 pm</td>
            <td>1234</td>
            <td>8879712345</td>
            <td>8080</td>
            <td>Billing Issue</td>
          </tr>
        </tbody>
      </mdb-tbl>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import { mdbCard, mdbCardBody, mdbCardHeader } from "mdbvue";

export default {
  name: "CallHistory",
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardHeader
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
