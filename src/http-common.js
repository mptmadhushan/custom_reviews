import axios from "axios";

export default axios.create({
  baseURL: "https://sinhala-review-analysis.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});
