<template>
  <div>
  
    <h1 class="page-title">
      News
            <img height="120" width="120" src="../assets/news.png" alt="">

    </h1>

    <b-row>
      <b-col sm="12" md="12">
        <Widget
          title=""
          customHeader close collapse
          v-for="item in news"
        >
          <h3>{{item.title}}</h3>
          <img :src=item.media alt="">
          <p>{{item.summary}}</p>
          <a :href=item.link target="_blank">Click For More</a> 

        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import axios from 'axios'
export default {
  name: 'Typography',
  components: { Widget },
  data() {
    return {
      news:[]
    }
  },
  mounted() {
      this.getNews()
    },
  methods:{
    getNews() {
axios({
    "method":"GET",
    "url":"https://covid-19-news.p.rapidapi.com/v1/covid",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"covid-19-news.p.rapidapi.com",
    "x-rapidapi-key":"28aefdea65msha1c927b88f9e110p105d22jsnb5c235c0917e",
    "useQueryString":true
    },"params":{
    "lang":"en",
    "media":"True",
    "q":"covid-19"
    }
    })
    .then((response)=>{
      this.news = response.data.articles
    })
    .catch((error)=>{
      console.log(error)
    })
    }
  }
};
</script>

<style scoped>
ul.a{
  list-style-type: circle;
}
</style>
