<template>
  <div class="container">
    <div class="header">
      <div class="name">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span @click="backToProject()"> 项目详情 </span>
      </div>
      <div class="search">
        <div class="box">
          <span>{{ oneProject.workName }}</span>
        </div>
      </div>
      <div class="button">
        <el-button type="success" @click="chooceRenameProject(oneProject.workId)">重命名</el-button>

      </div>
    </div>
    <div class="_main">
      <!-- 项目重命名弹框 -->
      <el-dialog v-model="dialogFormVisible" title="项目重命名">
        <el-form :model="renameProject">
          <el-form-item label="新名称">
            <el-input v-model="renameProject.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button round @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" round @click="rename()">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 项目简介 -->
      <div class="description">
        <el-descriptions class="margin-top" :column="3" :size="small" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Coordinate />
                </el-icon>
                项目编号
              </div>
            </template>
            {{ oneProject.workId }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                项目名称
              </div>
            </template>
            {{ oneProject.workName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                项目负责人
              </div>
            </template>
            {{ oneProject.leader }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <tickets />
                </el-icon>
                项目状态
              </div>
            </template>
            <el-tag size="small">{{ oneProject.workCondition }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <office-building />
                </el-icon>
                创建时间
              </div>
            </template>
            {{ oneProject.create_time }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <office-building />
                </el-icon>
                项目简介
              </div>
            </template>
            {{ oneProject.workIntroduction }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <el-row :gutter="12">
        <el-col :span="6">
          <div class="outCard" @click="handleLink()">
            <div class="card" style="background-color:Lavender;">
              <div class="card__wrapper">
                <div class="card___wrapper-acounts">
                  <div class="card__score">+3</div>
                  <div class="card__acounts">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                      <circle r="60" fill="#ffd8c9" cy="64" cx="64"></circle>
                      <circle r="48" opacity=".3" fill="#fff" cy="64" cx="64"></circle>
                      <path fill="#393c54"
                        d="m64 14a31 31 0 0 1 31 31v41.07a9.93 9.93 0 0 1 -9.93 9.93h-42.14a9.93 9.93 0 0 1 -9.93-9.93v-41.07a31 31 0 0 1 31-31z">
                      </path>
                      <circle r="7" fill="#fbc0aa" cy="60" cx="89"></circle>
                      <path fill="#00adfe"
                        d="m64 124a59.7 59.7 0 0 0 34.7-11.07l-3.33-10.29a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.33 10.29a59.7 59.7 0 0 0 34.7 11.07z">
                      </path>
                      <path fill="#ff8475" d="m46.54 121.45a59.93 59.93 0 0 0 34.92 0l-2.46-25.45h-30z"></path>
                      <path fill="#f85565" d="m48.13 105h31.74l-.39-4h-30.96z"></path>
                      <path fill="#ffd8c9" d="m76 96a12 12 0 0 1 -24 0z"></path>
                      <path stroke-width="14" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 83v12"></path>
                      <circle r="7" fill="#fbc0aa" cy="60" cx="39"></circle>
                      <path fill="#ffd8c9"
                        d="m64 90a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z">
                      </path>
                      <path stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 64.75v6.5"></path>
                      <path fill="#515570"
                        d="m64.83 18.35a27.51 27.51 0 0 0 -28.32 27.47v4.76a2 2 0 0 0 2 2h.58a1 1 0 0 0 .86-.49l4.05-7.09 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 4 7.09a1 1 0 0 0 .86.49h.58a2 2 0 0 0 2-2v-4.18c.05-14.95-11.66-27.61-26.61-28.05z">
                      </path>
                      <path fill="#f85565" d="m47.35 113h33.29l-.38-4h-32.52z"></path>
                      <path fill="#f85565" d="m46.58 121h34.84l-.39-4h-34.06z"></path>
                      <path opacity=".7" fill="#ff8475"
                        d="m58.52 79.39c0-.84 11-.84 11 0 0 1.79-2.45 3.25-5.48 3.25s-5.52-1.46-5.52-3.25z"></path>
                      <path opacity=".7" fill="#f85565"
                        d="m69.48 79.29c0 .78-11 .78-11 0 .04-1.79 2.52-3.29 5.52-3.29s5.48 1.5 5.48 3.29z"></path>
                      <circle r="3" fill="#515570" cy="58.75" cx="76.25"></circle>
                      <path stroke-linejoin="round" stroke-linecap="round" stroke="#515570" fill="none"
                        d="m70.75 59.84a6.61 6.61 0 0 1 11.5-1.31"></path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke: #515570;
                  stroke-width: 2;
                  opacity: 0.2;
                " d="m72.11 51.46 5.68-.4a4.62 4.62 0 0 1 4.21 2.1l.77 1.21"></path>
                      <circle r="3" fill="#515570" cy="58.75" cx="51.75"></circle>
                      <g stroke-linecap="round" fill="none">
                        <path stroke-linejoin="round" stroke="#515570" d="m57.25 59.84a6.61 6.61 0 0 0 -11.5-1.31"></path>
                        <path stroke-width="2" stroke-linejoin="round" stroke="#515570" opacity=".2"
                          d="m55.89 51.45-5.68-.39a4.59 4.59 0 0 0 -4.21 2.11l-.77 1.21"></path>
                        <path stroke-miterlimit="10" stroke="#f85565"
                          d="m57.25 78.76a17.4 17.4 0 0 0 6.75 1.12 17.4 17.4 0 0 0 6.75-1.12"></path>
                      </g>
                    </svg>
                  </div>
                  <div class="card__acounts">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                      <circle r="60" fill="#ff8475" cy="64" cx="64"></circle>
                      <circle r="48" opacity=".4" fill="#f85565" cy="64" cx="64"></circle>
                      <path fill="#7f3838"
                        d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z"></path>
                      <path opacity=".4" fill="#393c54"
                        d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z">
                      </path>
                      <circle r="7" fill="#fbc0aa" cy="65" cx="89"></circle>
                      <path fill="#4bc190"
                        d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z">
                      </path>
                      <path opacity=".3" fill="#356cb6"
                        d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z">
                      </path>
                      <path opacity=".3" fill="#356cb6"
                        d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z"></path>
                      <path fill="#fff" d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z"></path>
                      <path stroke-width="14" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 88.75v9.75"></path>
                      <circle r="7" fill="#fbc0aa" cy="65" cx="39"></circle>
                      <path fill="#ffd8c9"
                        d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z">
                      </path>
                      <path fill="#bc5b57"
                        d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z">
                      </path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke: #fff;
                  stroke-miterlimit: 10;
                  stroke-width: 2;
                  opacity: 0.1;
                " d="m62.76 36.94c4.24 8.74 10.71 10.21 16.09 10.21h5"></path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke: #fff;
                  stroke-miterlimit: 10;
                  stroke-width: 2;
                  opacity: 0.1;
                " d="m71 35c2.52 5.22 6.39 6.09 9.6 6.09h3"></path>
                      <circle r="3" fill="#515570" cy="62.28" cx="76"></circle>
                      <circle r="3" fill="#515570" cy="62.28" cx="52"></circle>
                      <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="50.42"></ellipse>
                      <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="77.58"></ellipse>
                      <g stroke-linejoin="round" stroke-linecap="round" fill="none">
                        <path stroke-width="4" stroke="#fbc0aa" d="m64 67v4"></path>
                        <path stroke-width="2" stroke="#515570" opacity=".2" d="m55 56h-9.25"></path>
                        <path stroke-width="2" stroke="#515570" opacity=".2" d="m82 56h-9.25"></path>
                      </g>
                      <path opacity=".4" fill="#f85565" d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z"></path>
                      <path fill="#f85565"
                        d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="card__menu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" viewBox="0 0 4 20" height="20" fill="none">
                    <g fill="#000">
                      <path d="m2 4c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2z"></path>
                      <path d="m2 12c1.10457 0 2-.8954 2-2 0-1.10457-.89543-2-2-2s-2 .89543-2 2c0 1.1046.89543 2 2 2z">
                      </path>
                      <path d="m2 20c1.10457 0 2-.8954 2-2s-.89543-2-2-2-2 .8954-2 2 .89543 2 2 2z"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="card__title">新建原型</div>
              <div class="card__subtitle">
                「原型设计」是由六个核桃自主研发的一款全新开放世界冒险游戏。
              </div>
              <div class="card__indicator">
                <span class="card__indicator-amount">135</span> Works /
                <span class="card__indicator-percentage">45%</span>
              </div>
              <div class="card__progress"><progress max="100" value="40"></progress></div>
            </div>

          </div>

        </el-col>
        <el-col :span="6">
          <div class="outCard">
            <div class="card" style="background-color:LightSteelBlue;">
              <div class="card__wrapper">
                <div class="card___wrapper-acounts">
                  <div class="card__score">+3</div>
                  <div class="card__acounts">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                      <circle r="60" fill="#ffd8c9" cy="64" cx="64"></circle>
                      <circle r="48" opacity=".3" fill="#fff" cy="64" cx="64"></circle>
                      <path fill="#393c54"
                        d="m64 14a31 31 0 0 1 31 31v41.07a9.93 9.93 0 0 1 -9.93 9.93h-42.14a9.93 9.93 0 0 1 -9.93-9.93v-41.07a31 31 0 0 1 31-31z">
                      </path>
                      <circle r="7" fill="#fbc0aa" cy="60" cx="89"></circle>
                      <path fill="#00adfe"
                        d="m64 124a59.7 59.7 0 0 0 34.7-11.07l-3.33-10.29a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.33 10.29a59.7 59.7 0 0 0 34.7 11.07z">
                      </path>
                      <path fill="#ff8475" d="m46.54 121.45a59.93 59.93 0 0 0 34.92 0l-2.46-25.45h-30z"></path>
                      <path fill="#f85565" d="m48.13 105h31.74l-.39-4h-30.96z"></path>
                      <path fill="#ffd8c9" d="m76 96a12 12 0 0 1 -24 0z"></path>
                      <path stroke-width="14" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 83v12"></path>
                      <circle r="7" fill="#fbc0aa" cy="60" cx="39"></circle>
                      <path fill="#ffd8c9"
                        d="m64 90a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z">
                      </path>
                      <path stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 64.75v6.5"></path>
                      <path fill="#515570"
                        d="m64.83 18.35a27.51 27.51 0 0 0 -28.32 27.47v4.76a2 2 0 0 0 2 2h.58a1 1 0 0 0 .86-.49l4.05-7.09 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 4 7.09a1 1 0 0 0 .86.49h.58a2 2 0 0 0 2-2v-4.18c.05-14.95-11.66-27.61-26.61-28.05z">
                      </path>
                      <path fill="#f85565" d="m47.35 113h33.29l-.38-4h-32.52z"></path>
                      <path fill="#f85565" d="m46.58 121h34.84l-.39-4h-34.06z"></path>
                      <path opacity=".7" fill="#ff8475"
                        d="m58.52 79.39c0-.84 11-.84 11 0 0 1.79-2.45 3.25-5.48 3.25s-5.52-1.46-5.52-3.25z"></path>
                      <path opacity=".7" fill="#f85565"
                        d="m69.48 79.29c0 .78-11 .78-11 0 .04-1.79 2.52-3.29 5.52-3.29s5.48 1.5 5.48 3.29z"></path>
                      <circle r="3" fill="#515570" cy="58.75" cx="76.25"></circle>
                      <path stroke-linejoin="round" stroke-linecap="round" stroke="#515570" fill="none"
                        d="m70.75 59.84a6.61 6.61 0 0 1 11.5-1.31"></path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke: #515570;
                  stroke-width: 2;
                  opacity: 0.2;
                " d="m72.11 51.46 5.68-.4a4.62 4.62 0 0 1 4.21 2.1l.77 1.21"></path>
                      <circle r="3" fill="#515570" cy="58.75" cx="51.75"></circle>
                      <g stroke-linecap="round" fill="none">
                        <path stroke-linejoin="round" stroke="#515570" d="m57.25 59.84a6.61 6.61 0 0 0 -11.5-1.31"></path>
                        <path stroke-width="2" stroke-linejoin="round" stroke="#515570" opacity=".2"
                          d="m55.89 51.45-5.68-.39a4.59 4.59 0 0 0 -4.21 2.11l-.77 1.21"></path>
                        <path stroke-miterlimit="10" stroke="#f85565"
                          d="m57.25 78.76a17.4 17.4 0 0 0 6.75 1.12 17.4 17.4 0 0 0 6.75-1.12"></path>
                      </g>
                    </svg>
                  </div>
                  <div class="card__acounts">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                      <circle r="60" fill="#ff8475" cy="64" cx="64"></circle>
                      <circle r="48" opacity=".4" fill="#f85565" cy="64" cx="64"></circle>
                      <path fill="#7f3838"
                        d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z"></path>
                      <path opacity=".4" fill="#393c54"
                        d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z">
                      </path>
                      <circle r="7" fill="#fbc0aa" cy="65" cx="89"></circle>
                      <path fill="#4bc190"
                        d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z">
                      </path>
                      <path opacity=".3" fill="#356cb6"
                        d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z">
                      </path>
                      <path opacity=".3" fill="#356cb6"
                        d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z"></path>
                      <path fill="#fff" d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z"></path>
                      <path stroke-width="14" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 88.75v9.75"></path>
                      <circle r="7" fill="#fbc0aa" cy="65" cx="39"></circle>
                      <path fill="#ffd8c9"
                        d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z">
                      </path>
                      <path fill="#bc5b57"
                        d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z">
                      </path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke: #fff;
                  stroke-miterlimit: 10;
                  stroke-width: 2;
                  opacity: 0.1;
                " d="m62.76 36.94c4.24 8.74 10.71 10.21 16.09 10.21h5"></path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke: #fff;
                  stroke-miterlimit: 10;
                  stroke-width: 2;
                  opacity: 0.1;
                " d="m71 35c2.52 5.22 6.39 6.09 9.6 6.09h3"></path>
                      <circle r="3" fill="#515570" cy="62.28" cx="76"></circle>
                      <circle r="3" fill="#515570" cy="62.28" cx="52"></circle>
                      <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="50.42"></ellipse>
                      <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="77.58"></ellipse>
                      <g stroke-linejoin="round" stroke-linecap="round" fill="none">
                        <path stroke-width="4" stroke="#fbc0aa" d="m64 67v4"></path>
                        <path stroke-width="2" stroke="#515570" opacity=".2" d="m55 56h-9.25"></path>
                        <path stroke-width="2" stroke="#515570" opacity=".2" d="m82 56h-9.25"></path>
                      </g>
                      <path opacity=".4" fill="#f85565" d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z"></path>
                      <path fill="#f85565"
                        d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="card__menu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" viewBox="0 0 4 20" height="20" fill="none">
                    <g fill="#000">
                      <path d="m2 4c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2z"></path>
                      <path d="m2 12c1.10457 0 2-.8954 2-2 0-1.10457-.89543-2-2-2s-2 .89543-2 2c0 1.1046.89543 2 2 2z">
                      </path>
                      <path d="m2 20c1.10457 0 2-.8954 2-2s-.89543-2-2-2-2 .8954-2 2 .89543 2 2 2z"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="card__title">项目原型</div>
              <div class="card__subtitle">
                游戏发生在一个被称作「项目原型」的幻想世界。</div>
              <div class="card__indicator">
                <span class="card__indicator-amount">135</span> Works /
                <span class="card__indicator-percentage">45%</span>
              </div>
              <div class="card__progress"><progress max="100" value="40"></progress></div>
            </div>
          </div>

        </el-col>
        <el-col :span="6">
          <div class="outCard" @click="writeFile()">
            <div class="card" style="background-color:AliceBlue;">
              <div class="card__wrapper">
                <div class="card___wrapper-acounts">
                  <div class="card__score">+3</div>
                  <div class="card__acounts">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                      <circle r="60" fill="#ffd8c9" cy="64" cx="64"></circle>
                      <circle r="48" opacity=".3" fill="#fff" cy="64" cx="64"></circle>
                      <path fill="#393c54"
                        d="m64 14a31 31 0 0 1 31 31v41.07a9.93 9.93 0 0 1 -9.93 9.93h-42.14a9.93 9.93 0 0 1 -9.93-9.93v-41.07a31 31 0 0 1 31-31z">
                      </path>
                      <circle r="7" fill="#fbc0aa" cy="60" cx="89"></circle>
                      <path fill="#00adfe"
                        d="m64 124a59.7 59.7 0 0 0 34.7-11.07l-3.33-10.29a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.33 10.29a59.7 59.7 0 0 0 34.7 11.07z">
                      </path>
                      <path fill="#ff8475" d="m46.54 121.45a59.93 59.93 0 0 0 34.92 0l-2.46-25.45h-30z"></path>
                      <path fill="#f85565" d="m48.13 105h31.74l-.39-4h-30.96z"></path>
                      <path fill="#ffd8c9" d="m76 96a12 12 0 0 1 -24 0z"></path>
                      <path stroke-width="14" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 83v12"></path>
                      <circle r="7" fill="#fbc0aa" cy="60" cx="39"></circle>
                      <path fill="#ffd8c9"
                        d="m64 90a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z">
                      </path>
                      <path stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 64.75v6.5"></path>
                      <path fill="#515570"
                        d="m64.83 18.35a27.51 27.51 0 0 0 -28.32 27.47v4.76a2 2 0 0 0 2 2h.58a1 1 0 0 0 .86-.49l4.05-7.09 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 4 7.09a1 1 0 0 0 .86.49h.58a2 2 0 0 0 2-2v-4.18c.05-14.95-11.66-27.61-26.61-28.05z">
                      </path>
                      <path fill="#f85565" d="m47.35 113h33.29l-.38-4h-32.52z"></path>
                      <path fill="#f85565" d="m46.58 121h34.84l-.39-4h-34.06z"></path>
                      <path opacity=".7" fill="#ff8475"
                        d="m58.52 79.39c0-.84 11-.84 11 0 0 1.79-2.45 3.25-5.48 3.25s-5.52-1.46-5.52-3.25z"></path>
                      <path opacity=".7" fill="#f85565"
                        d="m69.48 79.29c0 .78-11 .78-11 0 .04-1.79 2.52-3.29 5.52-3.29s5.48 1.5 5.48 3.29z"></path>
                      <circle r="3" fill="#515570" cy="58.75" cx="76.25"></circle>
                      <path stroke-linejoin="round" stroke-linecap="round" stroke="#515570" fill="none"
                        d="m70.75 59.84a6.61 6.61 0 0 1 11.5-1.31"></path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke: #515570;
                  stroke-width: 2;
                  opacity: 0.2;
                " d="m72.11 51.46 5.68-.4a4.62 4.62 0 0 1 4.21 2.1l.77 1.21"></path>
                      <circle r="3" fill="#515570" cy="58.75" cx="51.75"></circle>
                      <g stroke-linecap="round" fill="none">
                        <path stroke-linejoin="round" stroke="#515570" d="m57.25 59.84a6.61 6.61 0 0 0 -11.5-1.31"></path>
                        <path stroke-width="2" stroke-linejoin="round" stroke="#515570" opacity=".2"
                          d="m55.89 51.45-5.68-.39a4.59 4.59 0 0 0 -4.21 2.11l-.77 1.21"></path>
                        <path stroke-miterlimit="10" stroke="#f85565"
                          d="m57.25 78.76a17.4 17.4 0 0 0 6.75 1.12 17.4 17.4 0 0 0 6.75-1.12"></path>
                      </g>
                    </svg>
                  </div>
                  <div class="card__acounts">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                      <circle r="60" fill="#ff8475" cy="64" cx="64"></circle>
                      <circle r="48" opacity=".4" fill="#f85565" cy="64" cx="64"></circle>
                      <path fill="#7f3838"
                        d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z"></path>
                      <path opacity=".4" fill="#393c54"
                        d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z">
                      </path>
                      <circle r="7" fill="#fbc0aa" cy="65" cx="89"></circle>
                      <path fill="#4bc190"
                        d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z">
                      </path>
                      <path opacity=".3" fill="#356cb6"
                        d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z">
                      </path>
                      <path opacity=".3" fill="#356cb6"
                        d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z"></path>
                      <path fill="#fff" d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z"></path>
                      <path stroke-width="14" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 88.75v9.75"></path>
                      <circle r="7" fill="#fbc0aa" cy="65" cx="39"></circle>
                      <path fill="#ffd8c9"
                        d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z">
                      </path>
                      <path fill="#bc5b57"
                        d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z">
                      </path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke: #fff;
                  stroke-miterlimit: 10;
                  stroke-width: 2;
                  opacity: 0.1;
                " d="m62.76 36.94c4.24 8.74 10.71 10.21 16.09 10.21h5"></path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke: #fff;
                  stroke-miterlimit: 10;
                  stroke-width: 2;
                  opacity: 0.1;
                " d="m71 35c2.52 5.22 6.39 6.09 9.6 6.09h3"></path>
                      <circle r="3" fill="#515570" cy="62.28" cx="76"></circle>
                      <circle r="3" fill="#515570" cy="62.28" cx="52"></circle>
                      <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="50.42"></ellipse>
                      <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="77.58"></ellipse>
                      <g stroke-linejoin="round" stroke-linecap="round" fill="none">
                        <path stroke-width="4" stroke="#fbc0aa" d="m64 67v4"></path>
                        <path stroke-width="2" stroke="#515570" opacity=".2" d="m55 56h-9.25"></path>
                        <path stroke-width="2" stroke="#515570" opacity=".2" d="m82 56h-9.25"></path>
                      </g>
                      <path opacity=".4" fill="#f85565" d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z"></path>
                      <path fill="#f85565"
                        d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="card__menu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" viewBox="0 0 4 20" height="20" fill="none">
                    <g fill="#000">
                      <path d="m2 4c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2z"></path>
                      <path d="m2 12c1.10457 0 2-.8954 2-2 0-1.10457-.89543-2-2-2s-2 .89543-2 2c0 1.1046.89543 2 2 2z">
                      </path>
                      <path d="m2 20c1.10457 0 2-.8954 2-2s-.89543-2-2-2-2 .8954-2 2 .89543 2 2 2z"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="card__title">新建文档</div>
              <div class="card__subtitle">
                在这里，被神选中的人将被授予「新建文档」，导引元素之力。
              </div>
              <div class="card__indicator">
                <span class="card__indicator-amount">135</span> Works /
                <span class="card__indicator-percentage">45%</span>
              </div>
              <div class="card__progress"><progress max="100" value="40"></progress></div>
            </div>
          </div>

        </el-col>
        <el-col :span="6">
          <div class="outCard" @click="toProjectFile()">
            <div class="card" style="background-color:PaleTurquoise;">
              <div class="card__wrapper">
                <div class="card___wrapper-acounts">
                  <div class="card__score">+3</div>
                  <div class="card__acounts">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                      <circle r="60" fill="#ffd8c9" cy="64" cx="64"></circle>
                      <circle r="48" opacity=".3" fill="#fff" cy="64" cx="64"></circle>
                      <path fill="#393c54"
                        d="m64 14a31 31 0 0 1 31 31v41.07a9.93 9.93 0 0 1 -9.93 9.93h-42.14a9.93 9.93 0 0 1 -9.93-9.93v-41.07a31 31 0 0 1 31-31z">
                      </path>
                      <circle r="7" fill="#fbc0aa" cy="60" cx="89"></circle>
                      <path fill="#00adfe"
                        d="m64 124a59.7 59.7 0 0 0 34.7-11.07l-3.33-10.29a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.33 10.29a59.7 59.7 0 0 0 34.7 11.07z">
                      </path>
                      <path fill="#ff8475" d="m46.54 121.45a59.93 59.93 0 0 0 34.92 0l-2.46-25.45h-30z"></path>
                      <path fill="#f85565" d="m48.13 105h31.74l-.39-4h-30.96z"></path>
                      <path fill="#ffd8c9" d="m76 96a12 12 0 0 1 -24 0z"></path>
                      <path stroke-width="14" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 83v12"></path>
                      <circle r="7" fill="#fbc0aa" cy="60" cx="39"></circle>
                      <path fill="#ffd8c9"
                        d="m64 90a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z">
                      </path>
                      <path stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 64.75v6.5"></path>
                      <path fill="#515570"
                        d="m64.83 18.35a27.51 27.51 0 0 0 -28.32 27.47v4.76a2 2 0 0 0 2 2h.58a1 1 0 0 0 .86-.49l4.05-7.09 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 2.47 4.13a1 1 0 0 0 1.72 0l2.47-4.13 2.48 4.13a1 1 0 0 0 1.71 0l2.48-4.13 4 7.09a1 1 0 0 0 .86.49h.58a2 2 0 0 0 2-2v-4.18c.05-14.95-11.66-27.61-26.61-28.05z">
                      </path>
                      <path fill="#f85565" d="m47.35 113h33.29l-.38-4h-32.52z"></path>
                      <path fill="#f85565" d="m46.58 121h34.84l-.39-4h-34.06z"></path>
                      <path opacity=".7" fill="#ff8475"
                        d="m58.52 79.39c0-.84 11-.84 11 0 0 1.79-2.45 3.25-5.48 3.25s-5.52-1.46-5.52-3.25z"></path>
                      <path opacity=".7" fill="#f85565"
                        d="m69.48 79.29c0 .78-11 .78-11 0 .04-1.79 2.52-3.29 5.52-3.29s5.48 1.5 5.48 3.29z"></path>
                      <circle r="3" fill="#515570" cy="58.75" cx="76.25"></circle>
                      <path stroke-linejoin="round" stroke-linecap="round" stroke="#515570" fill="none"
                        d="m70.75 59.84a6.61 6.61 0 0 1 11.5-1.31"></path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke: #515570;
                  stroke-width: 2;
                  opacity: 0.2;
                " d="m72.11 51.46 5.68-.4a4.62 4.62 0 0 1 4.21 2.1l.77 1.21"></path>
                      <circle r="3" fill="#515570" cy="58.75" cx="51.75"></circle>
                      <g stroke-linecap="round" fill="none">
                        <path stroke-linejoin="round" stroke="#515570" d="m57.25 59.84a6.61 6.61 0 0 0 -11.5-1.31"></path>
                        <path stroke-width="2" stroke-linejoin="round" stroke="#515570" opacity=".2"
                          d="m55.89 51.45-5.68-.39a4.59 4.59 0 0 0 -4.21 2.11l-.77 1.21"></path>
                        <path stroke-miterlimit="10" stroke="#f85565"
                          d="m57.25 78.76a17.4 17.4 0 0 0 6.75 1.12 17.4 17.4 0 0 0 6.75-1.12"></path>
                      </g>
                    </svg>
                  </div>
                  <div class="card__acounts">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                      <circle r="60" fill="#ff8475" cy="64" cx="64"></circle>
                      <circle r="48" opacity=".4" fill="#f85565" cy="64" cx="64"></circle>
                      <path fill="#7f3838"
                        d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z"></path>
                      <path opacity=".4" fill="#393c54"
                        d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z">
                      </path>
                      <circle r="7" fill="#fbc0aa" cy="65" cx="89"></circle>
                      <path fill="#4bc190"
                        d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z">
                      </path>
                      <path opacity=".3" fill="#356cb6"
                        d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z">
                      </path>
                      <path opacity=".3" fill="#356cb6"
                        d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z"></path>
                      <path fill="#fff" d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z"></path>
                      <path stroke-width="14" stroke-linejoin="round" stroke-linecap="round" stroke="#fbc0aa" fill="none"
                        d="m64 88.75v9.75"></path>
                      <circle r="7" fill="#fbc0aa" cy="65" cx="39"></circle>
                      <path fill="#ffd8c9"
                        d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z">
                      </path>
                      <path fill="#bc5b57"
                        d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z">
                      </path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke: #fff;
                  stroke-miterlimit: 10;
                  stroke-width: 2;
                  opacity: 0.1;
                " d="m62.76 36.94c4.24 8.74 10.71 10.21 16.09 10.21h5"></path>
                      <path style="
                  fill: none;
                  stroke-linecap: round;
                  stroke: #fff;
                  stroke-miterlimit: 10;
                  stroke-width: 2;
                  opacity: 0.1;
                " d="m71 35c2.52 5.22 6.39 6.09 9.6 6.09h3"></path>
                      <circle r="3" fill="#515570" cy="62.28" cx="76"></circle>
                      <circle r="3" fill="#515570" cy="62.28" cx="52"></circle>
                      <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="50.42"></ellipse>
                      <ellipse ry="2.98" rx="4.58" opacity=".1" fill="#f85565" cy="69.67" cx="77.58"></ellipse>
                      <g stroke-linejoin="round" stroke-linecap="round" fill="none">
                        <path stroke-width="4" stroke="#fbc0aa" d="m64 67v4"></path>
                        <path stroke-width="2" stroke="#515570" opacity=".2" d="m55 56h-9.25"></path>
                        <path stroke-width="2" stroke="#515570" opacity=".2" d="m82 56h-9.25"></path>
                      </g>
                      <path opacity=".4" fill="#f85565" d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z"></path>
                      <path fill="#f85565"
                        d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="card__menu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" viewBox="0 0 4 20" height="20" fill="none">
                    <g fill="#000">
                      <path d="m2 4c1.10457 0 2-.89543 2-2s-.89543-2-2-2-2 .89543-2 2 .89543 2 2 2z"></path>
                      <path d="m2 12c1.10457 0 2-.8954 2-2 0-1.10457-.89543-2-2-2s-2 .89543-2 2c0 1.1046.89543 2 2 2z">
                      </path>
                      <path d="m2 20c1.10457 0 2-.8954 2-2s-.89543-2-2-2-2 .8954-2 2 .89543 2 2 2z"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="card__title">项目文档</div>
              <div class="card__subtitle">
                你将扮演一位名为「项目文档」的神秘角色，邂逅性格各异的同伴们。
              </div>
              <div class="card__indicator">
                <span class="card__indicator-amount">135</span> Works /
                <span class="card__indicator-percentage">45%</span>
              </div>
              <div class="card__progress"><progress max="100" value="40"></progress></div>
            </div>
          </div>


        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
// import { Delete, Plus, Finished } from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import httpInstance from "@/utils/http";
// import router from '@/router/index'
import { useRoute, useRouter } from "vue-router";
import { openURL } from "quasar";
const route = useRoute();
const router = useRouter();
// 定义某个项目变量
const oneProject = ref({});
// 定义项目文档变量
const projectArticle = ref([]);
// 定义项目原型变量
const projectDesign = ref([]);
const dialogFormVisible = ref(false);

const renameProject = ref({
  id: '',
  name: ''
})
// 钩子函数
onMounted(() => {
  getOneProject();
  getProjectArticle();
});

// 获取这个项目
const getOneProject = async () => {
  console.log(route.params.id);
  await httpInstance
    .post("/get_single_work", {
      workId: route.params.id,
    })
    .then((res) => {
      oneProject.value = res.results[0];
      oneProject.value.create_time = oneProject.value.create_time.slice(0, 10)
      console.log(oneProject.value);
    });
};

// 获取项目文档列表
const getProjectArticle = async () => {
  await httpInstance
    .post("/get_work_file", {
      workId: route.params.id,
    })
    .then((res) => {
      // console.log(res)
      projectArticle.value = res.results;
      console.log(projectArticle.value);
    });
};

// 返回上一级
const onBack = () => {
  router.push({ path: "/project" });
};

// 编写文档
const writeFile = () => {
  router.push({ path: `/writeArticle/${route.params.id}` });
};

// 阅读某个文档
const toArticle = (id) => {
  console.log(id);
  router.push({ path: `/article/${id}` });
};

// 跳转到项目原型
const handleLink = () => {
  // window.location.href = "www.baidu.com"
  window.open("http://localhost:8080/public/editor.html"); //"_blank"
};

// 跳转到项目列表
const backToProject = () => {
  router.push('/project')
}
// 项目重命名
// 1. 
const chooceRenameProject = (id) => {
  renameProject.value.id = id
  dialogFormVisible.value = true
}

// 2. 
const rename = async () => {
  await httpInstance.post('/work_modify_name', {
    workName: renameProject.value.name,
    workId: renameProject.value.id
  }).then(res => {
    console.log(res)
    dialogFormVisible.value = false
    ElMessage({
      message: '项目重命名成功',
      type: 'success',
    })
  })
  getOneProject()
}
// 跳转到项目文件
const toProjectFile = () => {
  console.log(route.params.id);
  router.push({
    path: `/projectFile/${route.params.id}/${oneProject.value.workName}`,
  });
};
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  display: flex;

  .name {
    height: 60px;
    width: 13.4%;
    line-height: 60px;
    text-align: center;
    padding-top: 20px;
    font-weight: bold;
    font-size: 18px;

  }

  .search {
    height: 60px;
    width: 73.3%;

    // background-color: pink;
    .box {
      margin: 0 auto;
      padding-top: 40px;
      height: 50px;
      width: 80%;
      text-align: center;
      font-size: 20px;
      font-weight: bold;

      .xiala {
        font-size: 15px;
        font-weight: normal;
      }
    }

    .searchBox {
      margin: 0 auto;
      width: 60%;
      position: relative;
    }

    .searchInput {
      display: inline-block;
      width: 85%;
      height: 38px;
      border: 2px solid rgb(109, 159, 254);
      border-right: 0;
      float: left;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      /* Firefox */
      -webkit-box-sizing: border-box;
      /* Safari */
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
    }

    .searchButton {
      display: inline-block;
      width: 15%;
      height: 38px;
      line-height: 40px;
      float: left;
      background-color: rgb(109, 159, 254);
      font-size: 16px;
      cursor: pointer;
      border-bottom-right-radius: 20px;
      border-top-right-radius: 20px;
      border: none;
      color: #fff;
    }
  }

  .button {
    height: 60px;
    width: 13.3%;
    // background-color: rgb(192, 255, 231);
    padding-top: 25px;
  }
}

._main {
  height: 65vh;
  margin: 2.5% 2.5%;
  padding: 30px 20px;
  background-color: rgb(245, 245, 245);
  // background: #eeeeee;
  /* CodePen Card */
  // box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  border-radius: 10px;
  // border-width: 1px;
  box-shadow: rgb(220, 220, 220) 3px 3px 6px 0px inset, rgba(245, 245, 245, 0.468) -3px -3px 6px 1px inset;

  .description {
    margin: 20px 20px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

}

/* CodePen Card */
/* CodePen Card */

/* .el-card ::v-deep .el-card__header {
  padding: 2px 10px;
  background-color: palegoldenrod;
} */
.footer {
  height: 50px;
  display: flex;
  justify-content: center;
}


button {
  padding: 15px 25px;
  border: unset;
  border-radius: 15px;
  color: #ffffff;
  z-index: 1;
  background: rgba(109, 159, 254);
  position: relative;
  font-weight: 400;
  font-size: 13px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms;
  overflow: hidden;
}

button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 15px;
  // background-color: #ff2d2d;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms
}

button:hover {
  color: #e8e8e8;
}

button:hover::before {
  width: 100%;
}

.mainHeader {
  height: 100px;
  margin-bottom: 10px;
  padding: 20px 30px;
  background-color: #d9ecff83;
}

.myAside {
  margin: 50px 0;
}

.oneProject {
  margin: 20px 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.textHeader {
  font-size: 20px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.projectBrief {
  /* height: 70px */
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.projectMainHeader {
  margin-top: 10px;
  height: 50px;
  background-color: pink;
}

.projectMainHeader .left {
  width: 50%;
  background-color: green;
}

.projectMainHeader .right {
  width: 50%;
  background-color: green;
}

.cardMain {
  height: 150px;
}

.el-card {
  min-width: 380px;
  margin-right: 20px;
  transition: all 0.5s;
}

.el-card:hover {
  margin-top: -5px;
  color: #79bbff;
  font-weight: bold;
}

.outCard {
  position: relative;
  transition: all 0.9s;
  /* 鼠标经过触发时间 */
}

.outCard :hover {
  box-shadow: 0 .15rem .3rem rgba(0, 0, 0, 0.4);
  /* box-shadow: 水平位置 垂直位置 模糊距离 阴影尺寸(影子大小) 内外阴影inset，默认外阴影 */
  /*//向上浮动*/
  transform: translateY(-.18rem);
}

.card {
  --main-color: #000;
  --bg-color: #EBD18D;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 300px;
  height: 300px;
  padding: 25px;
  background: var(--bg-color);
  border-radius: 20px;

}


.card__wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.card___wrapper-acounts {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
  cursor: pointer;
}

.card___wrapper-acounts>div:nth-child(2) {
  position: absolute;
  left: 25px;
  z-index: -1;
}

.card___wrapper-acounts>div:nth-child(3) {
  position: absolute;
  left: 50px;
  z-index: -2;
}

.card__score {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: var(--main-color);
}

.card__acounts {
  width: 42px;
  height: 42px;
}

.card__acounts svg {
  width: 100%;
  height: 100%;
}

.card__menu {
  width: 40px;
  height: 40px;
  background: #F6DB96;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.card__title {
  margin-top: 50px;
  font-weight: 900;
  font-size: 25px;
  color: var(--main-color);
}

.card__subtitle {
  margin-top: 15px;
  font-weight: 400;
  font-size: 15px;
  color: var(--main-color);
}

.card__indicator {
  margin-top: 50px;
  font-weight: 500;
  font-size: 14px;
  color: var(--main-color);
}

.card__progress progress {
  width: 100%;
  height: 4px;
  border-radius: 100px;
}

.card__progress progress::-webkit-progress-bar {
  background-color: #00000030;
  border-radius: 100px;
}

.card__progress progress::-webkit-progress-value {
  background-color: var(--main-color);
  border-radius: 100px;
}</style>
