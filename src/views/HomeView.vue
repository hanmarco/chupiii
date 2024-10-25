<template>
  <v-container>
    <h1>책 앨범 선택</h1>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="book in books" :key="book">
        <v-btn
          :to="`/album/${book}`"
          color="primary"
          outlined
        >
          Book {{ book }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      books: Array.from({ length: 71 }, (_, i) => String(i + 1).padStart(3, '0')), // 001 ~ 071
    };
  },
};
</script>
