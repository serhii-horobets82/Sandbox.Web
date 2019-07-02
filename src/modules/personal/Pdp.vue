<template>
  <v-container class="px-0">
    <v-layout row style="padding-bottom: 32px;">
      <span class="title font-weight-bold">PDP</span>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
      <v-card flat>
        <v-card-title class="pa-4">
          <span class="subheading font-weight-bold">My Planning</span>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-layout row wrap>
            <v-flex>
              <div class="grid-wrapper" ref="gridWrapper">
                <table class="grid" ref="grid">
                  <tr>
                    <td v-for="d in dates" :key="d.getTime()">
                      <span class="date">{{d.getDate()}}</span>
                      <br>
                      <span class="month">{{months[d.getMonth()]}}</span>
                    </td>
                  </tr>
                </table>
                <div class="events" ref="events">
                  <div v-for="(event, i) in events" :key="i"
                    class="event"
                    :style="{
                      'margin-left': `${getDaysDiff(event.date, startDate)*width}px`,
                      width: `200px`,

                    }"
                    :ref="`event_${i}`"
                  >{{event.name}}</div>
                </div>
              </div>
              <!-- <div id='timeline-embed' style="width: 100%; height: 300px"></div> -->
            </v-flex>
          </v-layout>
          <v-layout row wrap class="pt-3">
            <v-flex xs12
              v-for="(event, i) in events" :key="event.name"
              @click="scrollToView(i)"
              style="cursor: pointer;">
              {{event.name}}: {{event.date.toLocaleDateString()}}
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      </v-flex>
    </v-layout>

    <!-- <v-btn color="success">Add Certification</v-btn> -->

    <v-container grid-list-xl class="px-0">
      <v-layout row wrap>
        <v-flex xs4>
          <v-card flat style="border: 1px solid #E8EFF7;">
            <v-card-title primary-title class="pt-3 pb-0">
              <div>
                <div class="caption text-uppercase font-weight-bold">Calendar view</div>
                <div class="caption">{{ `${things.todo.length} Certification${things.todo.length?'s':''}` }}</div>
              </div>
              <v-spacer></v-spacer>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 29C22.732 29 29 22.732 29 15C29 7.26801 22.732 1 15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29Z" stroke="#3C88B5"/>
                <path d="M15.2546 11V19.5091" stroke="#3C88B5" stroke-width="0.818182" stroke-linecap="round"/>
                <path d="M19.5091 15.2546H11" stroke="#3C88B5" stroke-width="0.818182" stroke-linecap="round"/>
              </svg>
            </v-card-title>
            <v-card-text>
              <v-card flat class="mb-2 tile-1" v-for="item in things.todo" :key="item.id">
                <v-card-title primary-title class="pt-3">
                  <div>
                    <span class="caption">{{ item.type }}</span>
                    <div class="subheading font-weight-bold">{{ item.text }}</div>
                  </div>
                  <v-spacer></v-spacer>
                  <span class="price">$ {{ item.price }}</span>
                </v-card-title>
                <v-card-text style="padding-top: 0">
                  {{ item.dateString }}
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card flat style="border: 1px solid #E8EFF7;">
            <v-card-title primary-title class="pt-3 pb-0">
              <div>
                <div class="caption text-uppercase font-weight-bold">In progress</div>
                <div class="caption">{{ `${things.inProgress.length} Certification${things.inProgress.length?'s':''}` }}</div>
              </div>
              <v-spacer></v-spacer>
              <svg width="131" height="28" viewBox="0 0 131 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.848 18H19.54L18.472 15.156C18.36 14.852 18.196 14.644 17.98 14.532C17.764 14.412 17.468 14.352 17.092 14.352H15.22V18H13.996V9.456H17.512C18.448 9.456 19.164 9.664 19.66 10.08C20.164 10.496 20.416 11.092 20.416 11.868C20.416 12.428 20.268 12.904 19.972 13.296C19.676 13.688 19.256 13.964 18.712 14.124C19.208 14.212 19.568 14.564 19.792 15.18L20.848 18ZM17.368 13.356C17.992 13.356 18.456 13.236 18.76 12.996C19.064 12.748 19.216 12.38 19.216 11.892C19.216 11.404 19.064 11.044 18.76 10.812C18.464 10.572 18 10.452 17.368 10.452H15.22V13.356H17.368ZM27.4152 15H23.0952C23.1352 16.416 23.7792 17.124 25.0272 17.124C25.7232 17.124 26.3592 16.896 26.9352 16.44L27.3072 17.304C27.0352 17.544 26.6872 17.736 26.2632 17.88C25.8472 18.016 25.4272 18.084 25.0032 18.084C24.0352 18.084 23.2752 17.808 22.7232 17.256C22.1712 16.696 21.8952 15.932 21.8952 14.964C21.8952 14.348 22.0152 13.8 22.2552 13.32C22.5032 12.84 22.8472 12.468 23.2872 12.204C23.7272 11.94 24.2272 11.808 24.7872 11.808C25.6032 11.808 26.2432 12.072 26.7072 12.6C27.1792 13.128 27.4152 13.86 27.4152 14.796V15ZM24.8112 12.708C24.3552 12.708 23.9832 12.844 23.6952 13.116C23.4072 13.388 23.2232 13.776 23.1432 14.28H26.3472C26.2992 13.768 26.1432 13.38 25.8792 13.116C25.6152 12.844 25.2592 12.708 24.8112 12.708ZM32.01 11.808C32.53 11.808 32.994 11.94 33.402 12.204C33.81 12.468 34.126 12.84 34.35 13.32C34.582 13.8 34.698 14.352 34.698 14.976C34.698 15.6 34.586 16.148 34.362 16.62C34.138 17.084 33.822 17.444 33.414 17.7C33.006 17.956 32.538 18.084 32.01 18.084C31.546 18.084 31.138 17.988 30.786 17.796C30.442 17.596 30.182 17.312 30.006 16.944V20.592H28.806V13.656C28.806 13.024 28.774 12.456 28.71 11.952H29.838L29.958 13.068C30.118 12.668 30.378 12.36 30.738 12.144C31.098 11.92 31.522 11.808 32.01 11.808ZM31.734 17.124C32.278 17.124 32.702 16.936 33.006 16.56C33.31 16.184 33.462 15.656 33.462 14.976C33.462 14.288 33.31 13.752 33.006 13.368C32.702 12.976 32.278 12.78 31.734 12.78C31.174 12.78 30.746 12.968 30.45 13.344C30.154 13.72 30.006 14.256 30.006 14.952C30.006 15.648 30.154 16.184 30.45 16.56C30.754 16.936 31.182 17.124 31.734 17.124ZM38.7225 18.084C38.1305 18.084 37.6105 17.956 37.1625 17.7C36.7145 17.444 36.3665 17.08 36.1185 16.608C35.8785 16.136 35.7585 15.584 35.7585 14.952C35.7585 14.32 35.8785 13.768 36.1185 13.296C36.3665 12.816 36.7145 12.448 37.1625 12.192C37.6105 11.936 38.1305 11.808 38.7225 11.808C39.3065 11.808 39.8225 11.936 40.2705 12.192C40.7185 12.448 41.0625 12.816 41.3025 13.296C41.5505 13.768 41.6745 14.32 41.6745 14.952C41.6745 15.584 41.5505 16.136 41.3025 16.608C41.0625 17.08 40.7185 17.444 40.2705 17.7C39.8225 17.956 39.3065 18.084 38.7225 18.084ZM38.7105 17.124C39.2705 17.124 39.6985 16.94 39.9945 16.572C40.2905 16.204 40.4385 15.664 40.4385 14.952C40.4385 14.256 40.2865 13.72 39.9825 13.344C39.6865 12.968 39.2665 12.78 38.7225 12.78C38.1705 12.78 37.7425 12.968 37.4385 13.344C37.1345 13.72 36.9825 14.256 36.9825 14.952C36.9825 15.664 37.1305 16.204 37.4265 16.572C37.7305 16.94 38.1585 17.124 38.7105 17.124ZM46.1031 11.808C46.2871 11.808 46.4791 11.836 46.6791 11.892L46.6551 12.996C46.4391 12.916 46.2031 12.876 45.9471 12.876C45.3951 12.876 44.9791 13.044 44.6991 13.38C44.4271 13.708 44.2911 14.124 44.2911 14.628V18H43.0911V13.656C43.0911 13.024 43.0591 12.456 42.9951 11.952H44.1231L44.2311 13.044C44.3911 12.644 44.6391 12.34 44.9751 12.132C45.3111 11.916 45.6871 11.808 46.1031 11.808ZM49.6788 12.888V15.924C49.6788 16.34 49.7668 16.636 49.9428 16.812C50.1268 16.98 50.3788 17.064 50.6988 17.064C50.9068 17.064 51.1188 17.032 51.3348 16.968V17.952C51.0708 18.04 50.7708 18.084 50.4348 18.084C49.8108 18.084 49.3268 17.908 48.9827 17.556C48.6388 17.204 48.4668 16.692 48.4668 16.02V12.888H47.2908V11.952H48.4668V10.44L49.6788 10.02V11.952H51.3468V12.888H49.6788ZM59.5293 18.096C58.7053 18.096 57.9853 17.92 57.3693 17.568C56.7613 17.208 56.2933 16.7 55.9653 16.044C55.6373 15.388 55.4733 14.612 55.4733 13.716C55.4733 12.828 55.6373 12.056 55.9653 11.4C56.2933 10.744 56.7613 10.24 57.3693 9.888C57.9853 9.536 58.7053 9.36 59.5293 9.36C60.1133 9.36 60.6533 9.452 61.1493 9.636C61.6533 9.812 62.0773 10.072 62.4213 10.416L61.9893 11.328C61.5893 11 61.1933 10.764 60.8013 10.62C60.4173 10.468 59.9973 10.392 59.5413 10.392C58.6533 10.392 57.9653 10.68 57.4773 11.256C56.9973 11.832 56.7573 12.652 56.7573 13.716C56.7573 14.788 56.9973 15.616 57.4773 16.2C57.9653 16.776 58.6533 17.064 59.5413 17.064C59.9973 17.064 60.4173 16.992 60.8013 16.848C61.1933 16.696 61.5893 16.456 61.9893 16.128L62.4213 17.04C62.0773 17.384 61.6533 17.648 61.1493 17.832C60.6533 18.008 60.1133 18.096 59.5293 18.096ZM66.3553 18.084C65.7633 18.084 65.2433 17.956 64.7953 17.7C64.3473 17.444 63.9993 17.08 63.7513 16.608C63.5113 16.136 63.3913 15.584 63.3913 14.952C63.3913 14.32 63.5113 13.768 63.7513 13.296C63.9993 12.816 64.3473 12.448 64.7953 12.192C65.2433 11.936 65.7633 11.808 66.3553 11.808C66.9393 11.808 67.4553 11.936 67.9033 12.192C68.3513 12.448 68.6953 12.816 68.9353 13.296C69.1833 13.768 69.3073 14.32 69.3073 14.952C69.3073 15.584 69.1833 16.136 68.9353 16.608C68.6953 17.08 68.3513 17.444 67.9033 17.7C67.4553 17.956 66.9393 18.084 66.3553 18.084ZM66.3433 17.124C66.9033 17.124 67.3313 16.94 67.6273 16.572C67.9233 16.204 68.0713 15.664 68.0713 14.952C68.0713 14.256 67.9193 13.72 67.6153 13.344C67.3193 12.968 66.8993 12.78 66.3553 12.78C65.8033 12.78 65.3753 12.968 65.0713 13.344C64.7673 13.72 64.6153 14.256 64.6153 14.952C64.6153 15.664 64.7633 16.204 65.0593 16.572C65.3633 16.94 65.7913 17.124 66.3433 17.124ZM77.6239 11.808C78.9679 11.808 79.6399 12.616 79.6399 14.232V18H78.4279V14.292C78.4279 13.772 78.3359 13.392 78.1519 13.152C77.9759 12.912 77.6879 12.792 77.2879 12.792C76.8239 12.792 76.4559 12.952 76.1839 13.272C75.9199 13.592 75.7879 14.028 75.7879 14.58V18H74.5759V14.292C74.5759 13.772 74.4839 13.392 74.2999 13.152C74.1239 12.912 73.8359 12.792 73.4359 12.792C72.9719 12.792 72.6039 12.952 72.3319 13.272C72.0599 13.592 71.9239 14.028 71.9239 14.58V18H70.7239V13.656C70.7239 13.024 70.6919 12.456 70.6279 11.952H71.7559L71.8639 12.96C72.0399 12.592 72.2919 12.308 72.6199 12.108C72.9479 11.908 73.3319 11.808 73.7719 11.808C74.7079 11.808 75.3199 12.196 75.6079 12.972C75.7919 12.612 76.0599 12.328 76.4119 12.12C76.7719 11.912 77.1759 11.808 77.6239 11.808ZM84.5803 11.808C85.1003 11.808 85.5643 11.94 85.9723 12.204C86.3803 12.468 86.6963 12.84 86.9203 13.32C87.1523 13.8 87.2683 14.352 87.2683 14.976C87.2683 15.6 87.1563 16.148 86.9323 16.62C86.7083 17.084 86.3923 17.444 85.9843 17.7C85.5763 17.956 85.1083 18.084 84.5803 18.084C84.1163 18.084 83.7083 17.988 83.3563 17.796C83.0123 17.596 82.7523 17.312 82.5763 16.944V20.592H81.3763V13.656C81.3763 13.024 81.3443 12.456 81.2803 11.952H82.4083L82.5283 13.068C82.6883 12.668 82.9483 12.36 83.3083 12.144C83.6683 11.92 84.0923 11.808 84.5803 11.808ZM84.3043 17.124C84.8483 17.124 85.2723 16.936 85.5763 16.56C85.8803 16.184 86.0323 15.656 86.0323 14.976C86.0323 14.288 85.8803 13.752 85.5763 13.368C85.2723 12.976 84.8483 12.78 84.3043 12.78C83.7443 12.78 83.3163 12.968 83.0203 13.344C82.7243 13.72 82.5763 14.256 82.5763 14.952C82.5763 15.648 82.7243 16.184 83.0203 16.56C83.3243 16.936 83.7523 17.124 84.3043 17.124ZM88.6888 18V9.168H89.8888V18H88.6888ZM96.8253 15H92.5053C92.5453 16.416 93.1893 17.124 94.4373 17.124C95.1333 17.124 95.7693 16.896 96.3453 16.44L96.7173 17.304C96.4453 17.544 96.0973 17.736 95.6733 17.88C95.2573 18.016 94.8373 18.084 94.4133 18.084C93.4453 18.084 92.6853 17.808 92.1333 17.256C91.5813 16.696 91.3053 15.932 91.3053 14.964C91.3053 14.348 91.4253 13.8 91.6653 13.32C91.9133 12.84 92.2573 12.468 92.6973 12.204C93.1373 11.94 93.6373 11.808 94.1973 11.808C95.0133 11.808 95.6533 12.072 96.1173 12.6C96.5893 13.128 96.8253 13.86 96.8253 14.796V15ZM94.2213 12.708C93.7653 12.708 93.3933 12.844 93.1053 13.116C92.8173 13.388 92.6333 13.776 92.5533 14.28H95.7573C95.7093 13.768 95.5533 13.38 95.2893 13.116C95.0253 12.844 94.6693 12.708 94.2213 12.708ZM99.7295 12.888V15.924C99.7295 16.34 99.8175 16.636 99.9935 16.812C100.178 16.98 100.43 17.064 100.75 17.064C100.958 17.064 101.17 17.032 101.386 16.968V17.952C101.122 18.04 100.822 18.084 100.486 18.084C99.8615 18.084 99.3775 17.908 99.0335 17.556C98.6895 17.204 98.5175 16.692 98.5175 16.02V12.888H97.3415V11.952H98.5175V10.44L99.7295 10.02V11.952H101.398V12.888H99.7295ZM102.517 18V11.952H103.717V18H102.517ZM102.409 9.312H103.813V10.584H102.409V9.312ZM108.097 18.084C107.505 18.084 106.985 17.956 106.537 17.7C106.089 17.444 105.741 17.08 105.493 16.608C105.253 16.136 105.133 15.584 105.133 14.952C105.133 14.32 105.253 13.768 105.493 13.296C105.741 12.816 106.089 12.448 106.537 12.192C106.985 11.936 107.505 11.808 108.097 11.808C108.681 11.808 109.197 11.936 109.645 12.192C110.093 12.448 110.437 12.816 110.677 13.296C110.925 13.768 111.049 14.32 111.049 14.952C111.049 15.584 110.925 16.136 110.677 16.608C110.437 17.08 110.093 17.444 109.645 17.7C109.197 17.956 108.681 18.084 108.097 18.084ZM108.085 17.124C108.645 17.124 109.073 16.94 109.369 16.572C109.665 16.204 109.813 15.664 109.813 14.952C109.813 14.256 109.661 13.72 109.357 13.344C109.061 12.968 108.641 12.78 108.097 12.78C107.545 12.78 107.117 12.968 106.813 13.344C106.509 13.72 106.357 14.256 106.357 14.952C106.357 15.664 106.505 16.204 106.801 16.572C107.105 16.94 107.533 17.124 108.085 17.124ZM115.682 11.808C117.13 11.808 117.854 12.616 117.854 14.232V18H116.642V14.304C116.642 13.776 116.538 13.392 116.33 13.152C116.13 12.912 115.806 12.792 115.358 12.792C114.846 12.792 114.434 12.952 114.122 13.272C113.818 13.592 113.666 14.02 113.666 14.556V18H112.466V13.656C112.466 13.024 112.434 12.456 112.37 11.952H113.498L113.606 12.996C113.798 12.612 114.074 12.32 114.434 12.12C114.802 11.912 115.218 11.808 115.682 11.808Z" fill="#3C88B5"/>
                <rect x="0.5" y="0.5" width="130" height="27" rx="13.5" stroke="#3C88B5"/>
              </svg>
            </v-card-title>
            <v-card-text>
              <v-card flat class="mb-2 " :class="item.a == 1 ? 'tile-1' : 'tile-2'"
                v-for="item in things.inProgress" :key="item.id">
                <v-card-title primary-title class="pt-3">
                  <div>
                    <span class="caption">{{ item.type }}</span>
                    <div class="subheading font-weight-bold">{{ item.text }}</div>
                  </div>
                  <v-spacer></v-spacer>
                  <span class="price">$ {{ item.price }}</span>
                </v-card-title>
                <v-card-text style="padding-top: 0">
                  {{ item.dateString }}
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card flat style="border: 1px solid #E8EFF7;">
            <v-card-title primary-title class="pt-3 pb-0">
              <div>
              <div class="caption text-uppercase font-weight-bold">Completed</div>
              <div class="caption">{{ `${things.done.length} Certification${things.done.length?'s':''}` }}</div>
              </div>
            </v-card-title>
            <v-card-text>
              <v-card flat class="mb-2 tile-3"
                v-for="item in things.done" :key="item.id">
                <v-card-title primary-title class="pt-3">
                  <div>
                    <span class="caption">{{ item.type }}</span>
                    <div class="subheading font-weight-bold">{{ item.text }}</div>
                  </div>
                  <v-spacer></v-spacer>
                  <span class="price">$ {{ item.price }}</span>
                </v-card-title>
                <v-card-text style="padding-top: 0">
                  {{ item.dateString }}
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    startDate: null,
    endDate: null,
    dates: [],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    events: [
      { name: "English exam", date: new Date(2019, 12, 3) },
      { name: "Smart talk", date: new Date(2019, 10, 1) },
      { name: "Something today", date: new Date() }
    ],
    width: 40,
    things: {
      todo: [
        {id: 1, type: 'Development', text: 'Javascript blah 1', dateString: '25 Mar - 31 Mar, 2019', price: 1000},
      ],
      inProgress: [
        {id: 2, type: 'Development', text: 'Javascript blah 1', dateString: '25 Mar - 31 Mar, 2019', price: 500, a: 1},
        {id: 3, type: 'Development', text: 'Javascript blah 1', dateString: '25 Mar - 31 Mar, 2019', price: 1000, a: 2},
      ],
      done: [
        {id: 4, type: 'Development', text: 'Javascript blah 1', dateString: '25 Mar - 31 Mar, 2019', price: 200},
      ]
    }
  }),

  async created(){
    const startDate = new Date();
    startDate.setFullYear(2018);
    this.startDate = new Date(startDate.getTime());

    const endDate = new Date();
    endDate.setFullYear(2020);

    this.diffDays = this.getDaysDiff(startDate, new Date());

    const dates = [];
    for (
      let date = startDate;
      date < endDate;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date.getTime()));
    }
    this.dates = dates;
  },

  mounted() {
    this.$refs.events.style.width = this.$refs.grid.clientWidth + 'px';
    this.$refs.gridWrapper.scrollLeft = this.diffDays * this.width;
  },

  methods: {
    getDaysDiff(dt1, dt2) {
      return Math.floor(
        Math.abs(
          (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
            (1000 * 60 * 60 * 24)
        )
      );
    },
    scrollToView(i) {
      this.$refs.gridWrapper.scrollLeft = parseInt(this.$refs[`event_${i}`][0].style.marginLeft);
    },
    add(id) {

    },
    async save(){

    },
  }
}
</script>

<style lang="scss" scoped>
* {
  color: #3C88B5;
  font-family: Muli;
}
.grid-wrapper {
  overflow: auto;
  width: 100%;
}

.grid {
  border-collapse: collapse;

  td {
    height: 40px;
    min-width: 40px;
    text-align: right;
    background-color: #f7fbff;
    border: none;
    font-size: 10px;

    .date {
      margin-right: 1px;
    }
    .month {
      display: block;
      margin-top: -4px;
    }
  }
}

.events {
  padding: 26px 0;
  background-image: url("/img/misc/dash-background.svg");
  background-repeat: repeat;

  .event {
    background-color: rgba(109, 169, 205, 0.8);
    margin: 3px 0;
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    padding-left: 14px;
  }
}

.price {
  display:inline-block;
  background: #DFF0F6;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 10px;
  color: rgba(60, 136, 181, 0.507567)
}
.tile-1 {
  background-color: rgba(235, 247, 253, 0.8);
  border-left: 4px solid #3C88B5;
}
.tile-2 {
  background-color: rgba(181, 214, 236, 0.8);
  border-left: 4px solid #3C88B5;
}
.tile-3 {
  border: 1px solid #E8EFF7;
}
</style>
