<template>
    <div style="width: 1243;"> <!-- height: 100%-->
        <div v-if="!isMobile && coverImage" :style="'background-image: url(/static/images/uploads/'+coverImage+'?'+Math.random().toString(36).substr(2, 9)+'); background-size: cover; background-position: center; background-repeat: no-repeat; width: 100% !important; height: 400px !important;'">
        </div>
        <div v-if="!isMobile && !coverImage" :style="'background-image: url(/static/images/uploads/4.jpg); background-size: cover; background-position: center; background-repeat: no-repeat; width: 100% !important; height: 300px !important;'">
        </div> 
    </div>
</template>
<script>
export default {
    props: ['isMobile', 'coverImage', 'companyName', 'logo'],
}
</script>
