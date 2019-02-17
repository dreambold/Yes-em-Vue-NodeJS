<template>
    <div :style="ats('display: flex; margin-top: 22px; flex-direction: column; align-items: center; justify-content: center', '=', 'display: flex; flex-direction: column; padding: 40px; align-items: center; justify-content: center')">
        <div :style="ats('height: 100px; width: 100%; padding: 15px; margin: 40px; background: white; display: flex; flex-direction: row; justify-content: flex-start; align-items: center', '=', 'height: 100px; width: 850px; padding: 15px; margin: 40px; background: white; display: flex; flex-direction: row; justify-content: flex-start; align-items: center')">
          <div style="margin-right: 10px; width: 100%">
            <input v-model="query" placeholder="Busca una Empresa..." type="text" :style="`width: ${$vuetify.breakpoint.smAndDown ? '100%' : '100%'}; height: 42px; padding: 10px; border: 1px solid #ececec; border-radius: 4px; font-size: 22px; background: white; outline: none;`">
          </div>
          <div>
            <button @click="search()" type="button" style="background: #a0dc01; color: black; outline: none; border-radius: 2px; padding: 10px;">Buscar</button>
          </div>
        </div>

        <div :style="ats('background: white; height: 100%; width: 100%; padding: 20px;', '=', 'background: white; height: 400px; width: 850px; padding: 20px;')">
            <div v-if="loading" style="display: flex; justify-content: center; align-items: center; padding: 50px">
                 <v-progress-circular
                    :size="80"
                    indeterminate
                    color="green"
                ></v-progress-circular>
            </div>
            <div v-if="!loading" style="text-align: left; padding: 10px 30px 30px 30px;">
                <span style="font-size: 16px;">Unfortunately there were no results for "{{query}}".</span>
                <ul>
                    <li>Try spelling it a different way</li>
                    <li>Use a different search item.</li>
                    <li><a href="/register">Sign up now</a> and take advantage of advanced search options.</li>
                </ul>
            </div>
            <hr style="border: 0.5px solid #cecece">
            <div style="display: flex; padding-top: 30px; justify-content: center; flex-direction: column; align-items: center; text-align: center">
                <span style="font-size: 25px; color: black">Expand your professional network!</span>
                <br />
                <span style="font-size: 18px; clor: black">More tan 15 million professionals are on Yes Them... how about you?</span>
                <br />
                <button @click="$router.push('/register')" type="button" style="background: #a0dc01; color: black; outline: none; border-radius: 2px; padding: 10px;">Register for free</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            query: '',
            loading: true,
        }
    },
    methods: {
        ats (xs, sm, mdAndUp) { // According to Size
            if (this.$vuetify.breakpoint.xs) {
                return xs
            }
            else if (this.$vuetify.breakpoint.sm) {
                return sm === '=' ? xs : sm
            }
            if (this.$vuetify.breakpoint.mdAndUp) {
                return mdAndUp
            }
        },        
        search() {
            this.loading = true;
            setTimeout(() => this.loading = false, 1500)
        }
    },
    mounted() {
        if(this.$route.params.query) {
            this.query = this.$route.params.query.replace(/-/g, ' ');
            setTimeout(() => this.loading = false, 1500);            
        } else {
            this.loading = false;
        }
    }
}
</script>
