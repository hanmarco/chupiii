<template>
  <v-container v-if="imagesLoaded">
    <v-row>
      <v-col
        v-for="(image, index) in images"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card>
          <v-img
            :src="image"
            aspect-ratio="1.5"
            @error="onImageError(index)"
          ></v-img>
          <v-card-title>페이지 {{ index + 1 }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-progress-circular v-else indeterminate></v-progress-circular>
</template>

<script>
export default {
  props: ['bookId'],
  data() {
    return {
      images: [],
      maxPages: 28,
      imagesLoaded: false,
    };
  },
  async created() {
    await this.loadImages();
    this.imagesLoaded = true;
  },
  watch: {
    bookId() {
      this.loadImages();
    },
  },
  methods: {
    async loadImages() {
      this.images = [];
      this.imagesLoaded = false;
      const folderName = `bok_${String(this.bookId).padStart(3, '0')}`;
      for (let page = 1; page <= this.maxPages; page++) {
        const pageName = `page-${String(page).padStart(2, '0')}.png`;
        try {
          const imagePath = await import(`@/assets/books/${folderName}/${pageName}`);
          this.images.push(imagePath.default);
        } catch (error) {
          console.error(`이미지 로드 실패: ${pageName}`, error);
          this.images.push(null);
        }
      }
      this.imagesLoaded = true;
    },
    onImageError(index) {
      // 이미지 로드 실패 시 기본 이미지로 대체
      this.images[index] = require('@/assets/logo.png');
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 16px;
}
</style>
