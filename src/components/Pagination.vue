<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center overflow-auto" style="text-align: center;">
        <li class="page-item">
          <a class="page-link" href="#" @click="goToPrevious" :disabled="currentPage === 1">Previous</a>
        </li>
  
        <template v-if="pageCount <= 5">
          <li v-for="page in pageCount" :key="page" class="page-item">
            <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
          </li>
        </template>
  
        <template v-else>
          <li class="page-item">
            <a class="page-link" href="#" @click="goToPage(1)">first</a>
          </li>
          <li v-if="startingPage > 2" class="page-item disabled"><span class="page-link">...</span></li>
  
          <template v-if="pageCount - startingPage >= 4">
            <li v-for="index in 5" :key="index" class="page-item">
              <a class="page-link" href="#" @click="goToPage(startingPage + index - 1)">
                {{ startingPage + index - 1 }}
              </a>
            </li>
            <li v-if="pageCount > startingPage + 4" class="page-item disabled"><span class="page-link">...</span></li>
          </template>
          <template v-else>
            <li v-for="index in pageCount - startingPage + 1" :key="index" class="page-item">
              <a class="page-link" href="#" @click="goToPage(startingPage + index - 1)">
                {{ startingPage + index - 1 }}
              </a>
            </li>
          </template>
          <li class="page-item">
            <a class="page-link" href="#" @click="goToPage(pageCount)">Last</a>
          </li>
  
        </template>
        <li class="page-item">
          <a class="page-link" href="#" @click="goToNext" :disabled="currentPage === pageCount">Next</a>
        </li>
  
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      contentCount: {
        type: Number,
        required: true
      },
      itemsPerPage: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        currentPage: 1,
        startingPage: 1
      };
    },
    computed: {
      pageCount() {
        return Math.ceil(this.contentCount / this.itemsPerPage);
      },
      displayedPages() {
        const maxDisplayedPages = 5;
        const lastPage = this.pageCount;
        const selectedPage = this.currentPage;
  
        if (lastPage <= maxDisplayedPages) {
          // If total pages are less than or equal to maxDisplayedPages
          return Array.from({ length: lastPage }, (_, index) => index + 1);
        }
  
        // Calculate the starting page based on the selected page
        let start = Math.max(1, selectedPage - 2);
        let end = start + maxDisplayedPages - 1;
  
        if (end >= lastPage) {
          // Adjust the range if it exceeds the last page
          end = lastPage;
          start = Math.max(1, lastPage - maxDisplayedPages + 1);
        }
  
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
      }
    },
    methods: {
      goToPage(page) {
        // Calculate the new starting page based on the selected page
        if (this.pageCount > 5) {
          if (page <= 3) {
            this.startingPage = 1;
          } else if (page >= this.pageCount - 2) {
            this.startingPage = this.pageCount - 4;
          } else {
            this.startingPage = page - 2;
          }
        }
        this.currentPage = page;
        this.$emit('page-changed', page);
      },
      goToPrevious() {
        if (this.currentPage > 1) {
          this.currentPage--;
          if (this.currentPage < this.startingPage) {
            this.startingPage--;
          }
          this.$emit('page-changed', this.currentPage);
        }
      },
      goToNext() {
        if (this.currentPage < this.pageCount) {
          this.currentPage++;
          if (this.currentPage > this.startingPage + 4) {
            this.startingPage++;
          }
          this.$emit('page-changed', this.currentPage);
        }
      }
    }
  };
  </script>
  