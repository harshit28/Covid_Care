<template>
<div>
<b-row>
      <b-col sm="12" md="12">
        <Widget
          title="<h3><b><large class='text-muted'>Upload To Get Result</large></b></h3>"
          customHeader close collapse
        >
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <b-row>
                
            
              <b-col v-if="className!=''" sm="12" md="12">
                          <b-tooltip

                   <span  @click="refresh"
            class="refresh glyphicon glyphicon-refresh"
          />
          
                 <h3 class="text-danger" v-if="className=='COVID_19'">You have symptoms of COVID-19</h3>
                 <h3 class="text-info" v-if="className=='NORMAL'">You are Healthy</h3>
                 <h3 class="text-warning" v-if="className=='Pneumonia'">You have symptoms of {{className}}</h3>

                  <h3>Prediction is {{score *100}}% Accurate</h3>
                           <b-col class="mt--3" sm="3"  v-if="className=='NORMAL'">
        <img height="300" width="300" src="../assets/healthy.png" alt="">
                           </b-col>
           <b-col class="mt--3" sm="3"  v-else>
        <img height="300" width="300" src="../assets/notwell.png" alt="">
                 </b-col>
              </b-col>
       
              <b-col v-else-if="loader">
                            <ring-loader  :color="red" :size="size"></ring-loader>

              </b-col>

              <b-col sm="6" v-else>
                    <input @change="handleImage" class="custom-input" type="file" accept="image/*">

              </b-col>
              <b-col class="mt--3" sm="3" v-if="className== '' & loader == false">
        <img src="../assets/xray.png" alt="">
                 </b-col>
            </b-row>
          </div>

        </Widget>
      </b-col>
</b-row>



</div>

</template>

<script>
import axios from 'axios'
import Widget from '@/components/Widget/Widget';
import RingLoader from "@/components/RingLoader.vue";

export default {
    name:"upload",
    components: {Widget,RingLoader},
    data() {
        return {
            image: '',
            remoteUrl:"",
            className:"",
            score:0.0,
            loader:false
        }
    },
    methods: {
        refresh() {
            this.className = ""
            this.score = 0
        },
        handleImage(e) {
            const selectedImage = e.target.files[0]
            this.createBase64Image(selectedImage)
            this.loader= true
        },
        async createBase64Image(fileObj) {
            const reader = new FileReader()
            reader.onload = (e) => {
                this.image = e.target.result
                this.uploadImage()
            }
             reader.readAsDataURL(fileObj)
        },
        async uploadImage() {
            const {image} =  this
            // http://localhost:5001/shell-hacks-31d0a/us-central1/app/upload'

            axios.post('http://localhost:5001/shell-hacks-31d0a/us-central1/app/upload',{image}).then(res => {
                this.className=res.data.class
                this.loader = false
                if (this.className == 'COVID_19') {
                    this.addErrorNotification()
                }
                else if (this.className == 'NORMAL') {
                    this.addSuccessNotification()
                } else {
                    this.addInfoNotification()
                }
                this.score=res.data.score.toFixed(2)
                console.log("Response==>>>",res.data.score)
            }).catch(err=>{
                console.error("Error in uploading file",err)
            })
        },
        addErrorNotification() {
      this.$toasted.error('You need Immediate Medical Attention.', {
        action: [
          {
            text: 'Cancel',
            onClick: (e, toastObject) => {
                          toastObject.goAway(0);

            //   toastObject.el.classList.add('success');
            //   toastObject.text('Alien planet destroyed!').goAway(2000);
            }
          }
        ]
      });
    },
    addSuccessNotification() {
      this.$toasted.success('You are Healthy', {
        action: {
          text: 'Close',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      })
    },
        addInfoNotification() {
      this.$toasted.info('You need Medical Attention', {
        action: {
          text: 'Cancel launch',
          onClick: (e, toastObject) => {
                          toastObject.goAway(0);

            // toastObject.text('Thermonuclear war averted').goAway(1000);
          }
        }
      });
    },
    }
}
</script>

<style  scoped>
.refresh{
    float: right;
    height: 50px;
    width: 50px
    
}
.glyphicon {
  font-size: 25px;
}
</style>