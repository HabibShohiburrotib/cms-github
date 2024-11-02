<script setup>
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
import NavbarAdmin from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import ButtonBiru from '@/components/ButtonBiru.vue';

const router = useRouter();
const route = useRoute();
const isToastVisible = ref(false);
const toastMessage = ref('');
const isSidebarVisible = ref(true);
const isEditMode = ref(false);

const form = ref({
    phone_number: '',
    tiktok: '',
    instagram: '',
    x: '',
    youtube: '',
    linkedin: '',
});

const fetchSocialMediaData = async () => {
    try {
        const response = await axios.get('/social-media');
        Object.assign(form.value, response.data);
    } catch (error) {
        console.error('Error fetching Social Media data:', error);
    }
};

const saveSosmed = async () => {
    try {
        const response = await axios.post('/social-media/update', form.value);
        console.log(response.data.message);
        showToast('Social media updated successfully!');
        router.push('/cms/social-media');
    } catch (error) {
        console.error('Error updating Social Media:', error);
        showToast('Error updating Social Media.');
    }
};

const showToast = (message) => {
    toastMessage.value = message;
    isToastVisible.value = true;
    setTimeout(() => {
        isToastVisible.value = false;
    }, 3000);
};

const checkWindowSize = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
};

onMounted(() => {
    fetchSocialMediaData();
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    isEditMode.value = route.name === 'edit-social-media';
});

onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize);
});
</script>

<template>
    <div class="navbg-sa">
        <!-- NAVBAR START -->
        <NavbarAdmin />
        <!-- NAVBAR END -->

        <!-- SIDEBAR START -->
        <SidebarSA v-if="isSidebarVisible" />
        <!-- SIDEBAR END -->

        <div id="contentsa" class="dashboard-sa">
            <div class="container mt-80">
                <div class="row">
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div class="card rounded-3 p-4 border-0">
                            <template v-if="!isEditMode">
                                <h5 class="fw-light fs-16">Digitefa/CMS/Social Media</h5>
                                <h4 class="fs-24">Social Media</h4>
                            </template>
                            <template v-else>
                                <h3 class="fs-24 mb-4">Edit Social Media</h3>
                            </template>

                            <div class="d-flex justify-content-end">
                                <ButtonBiru v-if="!isEditMode" @click="toggleEditMode" class="fs-16 px-3 rounded-3 h-43 mb-3">
                                    <i class="bi bi-pencil-square me-1"></i> Edit Social Media
                                </ButtonBiru>
                            </div>
                            <div class="card bordersa rounded-3 pb-4">
                                <div class="ps-3 pe-4 mt-3 mb-2">
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="phone_number" class="fs-16 mb-0 mt-2">No Handphone</label>
                                        <input type="text" id="phone_number" class="form-control c-border w-75 h-43"
                                            placeholder="No Handphone" v-model="form.phone_number"
                                            :disabled="!isEditMode" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="tiktok" class="fs-16 mb-0 mt-2">Link Tiktok</label>
                                        <input type="text" id="tiktok" class="form-control c-border w-75 h-43"
                                            placeholder="Link Tiktok" v-model="form.tiktok" :disabled="!isEditMode" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="instagram" class="fs-16 mb-0 mt-2">Link Instagram</label>
                                        <input type="text" id="instagram" class="form-control c-border w-75 h-43"
                                            placeholder="Link Instagram" v-model="form.instagram"
                                            :disabled="!isEditMode" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="x" class="fs-16 mb-0 mt-2">Link X</label>
                                        <input type="text" id="x" class="form-control c-border w-75 h-43"
                                            placeholder="Link X" v-model="form.x" :disabled="!isEditMode" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="youtube" class="fs-16 mb-0 mt-2">Link Youtube</label>
                                        <input type="text" id="youtube" class="form-control c-border w-75 h-43"
                                            placeholder="Link Youtube" v-model="form.youtube" :disabled="!isEditMode" />
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <label for="linkedin" class="fs-16 mb-0 mt-2">Link LinkedIn</label>
                                        <input type="text" id="linkedin" class="form-control c-border w-75 h-43"
                                            placeholder="Link LinkedIn" v-model="form.linkedin"
                                            :disabled="!isEditMode" />
                                    </div>
                                </div>
                            </div>
                            <div v-if="isEditMode" class="d-flex justify-content-end mt-4">
                                <ButtonBiru @click="saveSosmed" class="ms-3 h-45 px-3 rounded-3 fs-16">
                                    Save
                                </ButtonBiru>
                            </div>
                        </div>
                        <div aria-live="polite" aria-atomic="true" class="position-fixed bs-toast">
                            <div v-if="isToastVisible"
                                class="toast align-items-center text-white bg-light-success border-0 show" role="alert">
                                <div class="d-flex">
                                    <div class="toast-body">
                                        {{ toastMessage }}
                                    </div>
                                    <button type="button" class="btn-close btn-close-white me-2 m-auto"
                                        @click="closeToast" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
