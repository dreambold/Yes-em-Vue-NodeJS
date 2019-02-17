<template>
    <ul class="avatars">
        <li class="avatars__item" v-for="(client, index) in clients.length<3 ? clients : clients.slice(0,clients.length==3 ? 3 : 4)" v-bind:key="index">
            <img v-if="quantity == 3 ? index<3 : index<4" :src="client.pictureUrl" class="avatars__img" :style="index<2 ? 'margin-right: 4px' : ''"/>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['clients', 'quantity'],
    data () {
        return {
        }
    },
    beforeMount() {
    }
}
</script>

<style type="text/css">
        ul.avatars {
            display: flex ; /* Causes LI items to display in row. */
            list-style-type: none ;
            margin: auto ; /* Centers vertically / horizontally in flex container. */
            /* padding: 0px 7px 0px 0px ; */
            z-index: 1 ; /* Sets up new stack-container. */
        }
        li.avatars__item {
            /* height: 49px ; */
            margin: 0px 0px 0px 0px ;
            padding: 0px 0px 0px 0px ;
            position: relative ;
            width: 42px ; /* Forces flex items to be smaller than their contents. */
        }
        /*
            These zIndex values will be only relative to the contents of the UL elements,
            which sets up its own stack container. As such, these will only be relevant
            to each other, not to the page at large.
            --
            NOTE: We could theoretically get around having to set explicit zIndex values
            by using "flex-direction: row-reverse" and using the natural stacking order
            of the DOM; however, to do that, we'd have to reverse the order of the HTML
            elements, which feels janky and unnatural.
        */
        li.avatars__item:nth-child( 1 ) { z-index: 6 ; margin-left: -25px }
        li.avatars__item:nth-child( 2 ) { z-index: 7 ; margin-left: -25px }
        li.avatars__item:nth-child( 3 ) { z-index: 8 ; margin-left: -25px }
        li.avatars__item:nth-child( 4 ) { z-index: 9 ; margin-left: -25px }
        /*
            These items are all 49px wide while the flex-item (in which they live) is
            only 42px wide. As such, there will be several pixels of overflow content,
            which will be displayed in a reverse-stacking order based on above zIndex.
        */
        img.avatars__img,
        span.avatars__initials,
        span.avatars__others {
            background-color: #596376 ;
            border: 2px solid white ;
            border-radius: 100px 100px 100px 100px ;
            color: #FFFFFF ;
            display: block ;
            font-family: sans-serif ;
            font-size: 12px ;
            font-weight: 100 ;
            height: 34px ;
            line-height: 45px ;
            text-align: center ;
            width: 34px ;
        }
        span.avatars__others {
            background-color: #1E8FE1 ;
        }

</style>