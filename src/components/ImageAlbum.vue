<template>
  <div class="image-album d-flex align-center justify-center">
    <v-carousel v-if="imagesLoaded" v-model="currentSlide" class="carousel-container w-100">
      <v-carousel-item
        v-for="(imagePair, index) in imagePairs"
        :key="index"
        class="carousel-item"
      >
        <v-row class="fill-height ma-0">
          <v-col
            v-for="(image, subIndex) in imagePair"
            :key="subIndex"
            class="d-flex align-center justify-center pa-0 fill-height"
          >
            <v-img
              :src="image"
              contain
              class="fill-height"
              @error="onImageError(index * 2 + subIndex)"
            ></v-img>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-progress-circular v-else indeterminate></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: ['bookId'],
  data() {
    return {
      images: [],
      maxPages: 28,
      imagesLoaded: false,
      currentSlide: 0,
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
      this.images[index] = require('@/assets/logo.png');
    },
  },
  computed: {
    imagePairs() {
      const pairs = [];
      for (let i = 0; i < this.images.length; i += 2) {
        pairs.push(this.images.slice(i, i + 2));
      }
      return pairs;
    },
  },
};
</script>

<style scoped>
.image-album {
  height: 100vh;
}

.carousel-container {
  width: 80%;
  height: 80vh;
}

.carousel-item {
  height: 100%;
}

.v-carousel {
  height: 100% !important;
}

.v-carousel .v-window__container {
  height: 100%;
}

.v-img {
  max-height: 100%;
}
</style>
