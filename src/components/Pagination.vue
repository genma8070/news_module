  
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
    computed: {
        pageCount() {
            return Math.ceil(this.contentCount / this.itemsPerPage);
        }
    },
    methods: {
        goToPage(page) {
            this.$emit('page-changed', page);
        },
        goToPrevious() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.$emit('page-changed', this.currentPage);
            }
        },
        goToNext() {
            if (this.currentPage < this.pageCount) {
                this.currentPage++;
                this.$emit('page-changed', this.currentPage);
            }
        }
    }
};
</script>
<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <!-- <li class="page-item"><a class="page-link" href="#" @click="goToPrevious(currentPage)">Previous</a></li> -->
            <li v-for="page in pageCount" :key="page" class="page-item">
                <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
            </li>
            <!-- <li class="page-item"><a class="page-link" href="#" @click="goToNext(currentPage)">Next</a></li> -->
        </ul>
    </nav>
</template>

  