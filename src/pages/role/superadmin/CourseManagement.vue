<script setup>
import NavbarSA from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';
import { ref, onUnmounted, onMounted, computed } from 'vue';

const isSidebarVisible = ref(true);

const courses = ref([
    { id: 1, name: 'Dasar Pemrograman Web', teacher: 'Dika Prabowo', description: '...' },
    { id: 2, name: 'Pengembangan Aplikasi Mobile', teacher: 'Ayu Lestari', description: '...' },
]);

const itemsPerPage = ref(10);
const currentPage = ref(1);
const filteredData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return courses.value.slice(start, start + itemsPerPage.value);
});
const totalPages = computed(() => Math.ceil(courses.value.length / itemsPerPage.value));
const pageNumbers = computed(() => {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

const goToPage = (page) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const checkWindowSize = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

onMounted(() => {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize);
});
</script>

<template>
    <div class="navbg-sa">
        <!-- NAVBAR START -->
        <NavbarSA />
        <!-- NAVBAR END -->

        <!-- SIDEBAR START -->
        <SidebarSA v-if="isSidebarVisible" />
        <!-- SIDEBAR END -->

        <div id="contentsa" class="dashboard-sa">
            <div class="container mt-80">
                <div class="row">
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div class="card rounded-3 p-4 border-0">
                            <h5 class="fw-light fs-16">Digitefa/Course Management</h5>
                            <h4 class="fs-24">Course Management</h4>
                            <div class="d-flex justify-content-end align-items-center mb-3">
                                <div class="search-input w-20 me-md-1">
                                    <input type="text" class="form-control c-border rounded-3 h-40"
                                        v-model="searchQuery" placeholder="Search" />
                                    <i class="bi bi-search"></i>
                                </div>
                                <select class="form-select w-15 c-border h-40 ms-2">
                                    <option selected>Sort</option>
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                                <ButtonBiru class="fs-16 px-3 rounded-3 h-43 ms-2">
                                    <i class="bi bi-plus me-1"></i>Add Course
                                </ButtonBiru>
                            </div>

                            <div class="col-md-12 mt-4 mt-md-0">
                                <div class="table-responsive">
                                    <table class="table custom-table rounded-4">
                                        <thead class="thead-custom">
                                            <tr class="ps-4">
                                                <th class="ps-3 fs-16 fw-light w-1">No</th>
                                                <th class="fs-16 fw-light w-400">Name Course</th>
                                                <th class="fs-16 fw-light w-200">Teacher</th>
                                                <th class="ps-4 fs-16 fw-light w-10">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody class="table-custom">
                                            <tr v-for="(course, index) in filteredData" :key="course.id">
                                                <td class="ps-4 pt-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <img src="../../../assets/images/bg-7.png" class="rounded me-3"
                                                            alt="Course Image" width="88px" height="56px" />
                                                        <div class="ms-0">
                                                            <h6 class="mb-1 fs-16 fw-medium">{{ course.name }}</h6>
                                                            <p class="mb-0 text-muted fs-12">{{ course.description }}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="pt-4">{{ course.teacher }}</td>
                                                <td class="ps-4 pt-4">
                                                    <button class="border-0 rounded-2 me-1"
                                                        style="background-color: #06A73B; height: 30px; width: 30px; color:white;">
                                                        <i class="bi bi-clock"></i>
                                                    </button>
                                                    <button class="border-0 rounded-2"
                                                        style="background-color: #FF0000; height: 30px; width: 30px; color:white;">
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="4" class="p-1">
                                                    <nav>
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div class="d-flex align-items-center">
                                                                <label for="itemsPerPage" class="me-2">Items per
                                                                    page:</label>
                                                                <select id="itemsPerPage" class="form-select w-auto"
                                                                    v-model="itemsPerPage">
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="50">50</option>
                                                                </select>
                                                            </div>
                                                            <span class="fs-16">{{ (currentPage - 1) * itemsPerPage + 1
                                                                }} - {{
                                                                    Math.min(currentPage * itemsPerPage, courses.length) }}
                                                                of
                                                                {{ courses.length }} items</span>
                                                            <ul class="pagination custom-pagination mb-0">
                                                                <li class="page-item"
                                                                    :class="{ disabled: currentPage === 1 }">
                                                                    <a class="page-link" href="#"
                                                                        @click.prevent="goToPage(currentPage - 1)">
                                                                        <i class="bi bi-chevron-left"></i>
                                                                    </a>
                                                                </li>
                                                                <li v-for="page in pageNumbers" :key="page"
                                                                    class="page-item"
                                                                    :class="{ active: page === currentPage }">
                                                                    <a class="page-link" href="#"
                                                                        @click.prevent="goToPage(page)"
                                                                        v-if="page !== '...'">{{ page }}</a>
                                                                    <span class="page-link" v-else>...</span>
                                                                </li>
                                                                <li class="page-item"
                                                                    :class="{ disabled: currentPage === totalPages }">
                                                                    <a class="page-link" href="#"
                                                                        @click.prevent="goToPage(currentPage + 1)">
                                                                        <i class="bi bi-chevron-right"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </nav>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
