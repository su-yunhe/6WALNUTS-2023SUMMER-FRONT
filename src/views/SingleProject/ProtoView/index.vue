<template>
  <el-card class="a11" style="width: 100%">
    <div v-for="item in paginatedData">
      <div class="card" style="float: left; width: 80%; margin-left: 40px">
        <a class="card1" href="../../../public/demo/album/index.html">
          <p style="font-size: 25px">{{ item.protoName }}</p>
          <br />
          <p class="small">
            Card description with lots of great facts and interesting details.
          </p>

          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>
        </a>
      </div>
      <button style="float: left; margin-top: 40px">
        开放预览
        <div class="arrow-wrapper">
          <div class="arrow"></div>
        </div>
      </button>
    </div>
  </el-card>
  <div class="footer">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="items.length"
    />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import httpInstance from "@/utils/http";
const items = ref([]);
const getList = async () => {
  await httpInstance
    .post("/page_get", {
      workId: "5",
    })
    .then((res) => {
      console.log(res.results);
      items.value=res.results;
      //url.value = res.results[0].protoInclude;
      // router.push({ path: '/project' })
    });
};
console.log(items.value.length);
const currentPage = ref(1);
const pageSize = ref(5);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return items.value.slice(start, end);
});
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};
onMounted(() => {
  getList();
});
</script>
<style scoped>
.footer {
  height: 50px;
  display: flex;
  justify-content: center;
}
.card p {
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: #666;
}

.card p.small {
  font-size: 20px;
}

.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32px;
  height: 32px;
  overflow: hidden;
  top: 0;
  right: 0;
  background-color: #00838d;
  border-radius: 0 4px 0 32px;
}

.go-arrow {
  margin-top: -4px;
  margin-right: -4px;
  color: white;
  font-family: courier, sans;
}

.card1 {
  display: block;
  position: relative;
  max-width: 90%;
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
}

.card1:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: #00838d;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.25s ease-out;
}

.card1:hover:before {
  transform: scale(21);
}

.card1:hover p {
  transition: all 0.3s ease-out;
  color: rgba(255, 255, 255, 0.8);
}

.card1:hover h3 {
  transition: all 0.3s ease-out;
  color: #fff;
}

.card2 {
  display: block;
  top: 0px;
  position: relative;
  max-width: 262px;
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  border: 1px solid #f2f8f9;
}

.card2:hover {
  transition: all 0.2s ease-out;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  top: -4px;
  border: 1px solid #ccc;
  background-color: white;
}

.card2:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: #00838d;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(2);
  transform-origin: 50% 50%;
  transition: transform 0.15s ease-out;
}

.card2:hover:before {
  transform: scale(2.15);
}

.card3 {
  display: block;
  top: 0px;
  position: relative;
  max-width: 262px;
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  overflow: hidden;
  border: 1px solid #f2f8f9;
}

.card3 .go-corner {
  opacity: 0.7;
}

.card3:hover {
  border: 1px solid #00838d;
  box-shadow: 0px 0px 999px 999px rgba(255, 255, 255, 0.5);
  z-index: 500;
}

.card3:hover p {
  color: #00838d;
}

.card3:hover .go-corner {
  transition: opactiy 0.3s linear;
  opacity: 1;
}

.card4 {
  display: block;
  top: 0px;
  position: relative;
  max-width: 262px;
  background-color: #fff;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  overflow: hidden;
  border: 1px solid #ccc;
}

.card4 .go-corner {
  background-color: #00838d;
  height: 100%;
  width: 16px;
  padding-right: 9px;
  border-radius: 0;
  transform: skew(6deg);
  margin-right: -36px;
  align-items: start;
  background-image: linear-gradient(-45deg, #8f479a 1%, #dc2a74 100%);
}

.card4 .go-arrow {
  transform: skew(-6deg);
  margin-left: -2px;
  margin-top: 9px;
  opacity: 0;
}

.card4:hover {
  border: 1px solid #cd3d73;
}

.card4 h3 {
  margin-top: 8px;
}

.card4:hover .go-corner {
  margin-right: -12px;
}

.card4:hover .go-arrow {
  opacity: 1;
}

button {
  --primary-color: #645bff;
  --secondary-color: #fff;
  --hover-color: #111;
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color: var(--secondary-color);
  padding: 1em 1.8em;
  background: var(--primary-color);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  font-weight: bold;
}

button .arrow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

button .arrow {
  margin-top: 1px;
  width: var(--arrow-width);
  background: var(--primary-color);
  height: var(--arrow-stroke);
  position: relative;
  transition: 0.2s;
}

button .arrow::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: solid var(--secondary-color);
  border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
  display: inline-block;
  top: -3px;
  right: 3px;
  transition: 0.2s;
  padding: 3px;
  transform: rotate(-45deg);
}

button:hover {
  background-color: var(--hover-color);
}

button:hover .arrow {
  background: var(--secondary-color);
}

button:hover .arrow:before {
  right: 0;
}
.a11 {
  background-image: url("@/assets/images/a11.jpg");
  background-repeat: no-repeat;
  background-size: 100%, 100%;
}
</style>
