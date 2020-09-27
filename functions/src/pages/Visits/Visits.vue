<template>
  <div class="visits-page">
    <h1 class="page-title">Covid Care&nbsp;
      <!-- <small>
        <small>The Lucky One</small>
      </small> -->
    </h1>
    <b-row>
      <b-col lg="7">
        <Widget class="bg-transparent">
          <Map />
        </Widget>
      </b-col>
      <b-col class="mt--3" sm="3"> 
        
        <img src="../../assets/bg1.png" alt="">
      </b-col>
       <!-- <b-col sm="3"> -->
        <!-- <Widget class="bg-transparent">
          <div v-for="vid in videos">
                  <iframe id="ytplayer" type="text/html" width="640" height="360" :src=vid
  frameborder="0"></iframe>
            <video crossOrigin="anonymous" :src=vid></video>
          </div>
       </Widget>
      </b-col> -->


    </b-row>

    
    <b-row>
      <b-col lg="4" xs="12">
        <Widget
          title="<h6> TOTAL CASES </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <p class="value"><h3>{{totalCases}}</h3></p>

            </div>
          </div>
          <b-progress variant="success" :value="60"
            :max="100" class="progress-xs" />
          <p>
            <small>
              <span class="circle bg-primary text-white">
                <i class="la la-angle-up" />
              </span>
            </small>
            <span class="fw-semi-bold">&nbsp;17% higher</span>
            &nbsp;than last month
          </p>
        </Widget>
      </b-col>
      <b-col lg="4" xs="12">
        <Widget
          title="<h6> TOTAL DEATHS </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <p class="value"><h3>{{totalDeaths}}</h3></p>
            </div>
          </div>
          <b-progress variant="danger"
            :value="60" :max="100" class="progress-xs" />
          <p>
            <small>
              <span class="circle bg-primary text-white">
                <i class="la la-angle-down" />
              </span>
            </small>
            <span class="fw-semi-bold">&nbsp;8% lower</span>
            &nbsp;than last month
          </p>
        </Widget>
      </b-col>
      <b-col lg="4" xs="12">
        <Widget
          title="<h6> TOTAL RECOVERED </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <p class="value"><h3>{{totalRecovered}}</h3></p>
            </div>
           
          </div>
          <b-progress variant="primary" :value="60"
            :max="100" class="progress-xs" />
          <p>
            <small>
              <span class="circle bg-primary text-white">
                <i class="la la-plus" />
              </span>
            </small>
            <span class="fw-semi-bold">&nbsp;8 734 higher</span>
            &nbsp;than last month
          </p>
        </Widget>
      </b-col>
    </b-row>
    
  </div>
</template>

<script>
var convert = require('xml-js');
import axios from 'axios';
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import Map from './components/Map/Map';
import Calendar from './components/Calendar/Calendar';
import AreaChart from './components/AreaChart/AreaChart';
import AnimatedNumber from "animated-number-vue";

export default {
  name: 'Visits',
  components: {
    Widget, Map, Calendar, AreaChart, AnimatedNumber
  },
  data() {
    return {
      videos:[],
      totalCases:0,
      totalDeaths:0,
      totalRecovered:0,
      animateNumberOptions: {
        duration: 2000,
        easing: 'easeInQuad',
        formatValue(value) {
          return value.toFixed(0);
        }
      },
      checkedArr: [false, false, false],
      dataCollection: null,
    };
  },
  methods: {
    getTweet() {
      const url = 'https://www.googleapis.com/youtube/v3/search?q=%22covid19%22&key=AIzaSyBHYPhdz9jjoftVnKTmFVqlGNveZ7oEMRo'
      axios.get(url).then(res=>{
        this.videos=res.data.items
        for (var i=0;i<res.data.items.length;i++){
          if (res.data.items[i].id.videoId!=undefined) {
  var id= res.data.items[i].id.videoId
          var url  = "https://www.youtube.com/watch?v="+id
          this.videos.push(url)
          }
        
        }
        console.log(this.videos)

      })
    },
    checkTable(id) {
      let arr = [];
      if (id === 0) {
        const val = !this.checkedArr[0];
        for (let i = 0; i < this.checkedArr.length; i += 1) {
          arr[i] = val;
        }
      } else {
        arr = this.checkedArr;
        arr[id] = !arr[id];
      }
      if (arr[0]) {
        let count = 1;
        for (let i = 1; i < arr.length; i += 1) {
          if (arr[i]) {
            count += 1;
          }
        }
        if (count !== arr.length) {
          arr[0] = !arr[0];
        }
      }
      Vue.set(this, 'checkedArr', arr);
    },
    fillData () {
      const url ="https://api.covid19api.com/world/total"
      axios.get(url).then(res=>{
        this.totalRecovered = res.data.TotalRecovered
        this.totalDeaths = res.data.TotalDeaths
        this.totalCases = res.data.TotalConfirmed
      }).catch(err=>{
        console.error("Can not get Data",err)
      })
      this.dataCollection = {

        labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#1870DC',
            borderColor: 'transparent',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data Two',
            backgroundColor: '#F45722',
            borderColor: 'transparent',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  mounted () {
    this.fillData();
    this.getTweet()
  },
};
</script>

<style src="./Visits.scss" lang="scss" />
