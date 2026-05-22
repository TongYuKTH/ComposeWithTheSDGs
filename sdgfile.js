// 完整的SDG图标路径
const sdgImages = {
  1: "img/sdg1.png",
  2: "img/sdg2.png",
  3: "img/sdg3.png",
  4: "img/sdg4.png",
  5: "img/sdg5.png",
  6: "img/sdg6.png",
  7: "img/sdg7.png",
  8: "img/sdg8.png",
  9: "img/sdg9.png",
  10: "img/sdg10.png",
  11: "img/sdg11.png",
  12: "img/sdg12.png",
  13: "img/sdg13.png",
  14: "img/sdg14.png",
  15: "img/sdg15.png",
  16: "img/sdg16.png",
  17: "img/sdg17.png"
};
export {sdgImages};


// 定义SDG对应的颜色
const sdgColors = {
  '1': '#e5243b', // 红色 - 无贫困 No Poverty
  '2': '#DDA63A', // 黄色 - 零饥饿 Zero Hunger
  '3': '#4C9F38', // 绿色 - 良好健康与福祉 Good Health and Well-being
  '4': '#C5192D', // 红色 - 优质教育 Quality Education
  '5': '#FF3A21', // 橙红色 - 性别平等 Gender Equality
  '6': '#26BDE2', // 浅蓝色 - 清洁饮水和卫生设施 Clean Water and Sanitation
  '7': '#FCC30B', // 黄色 - 经济适用的清洁能源 Affordable and Clean Energy
  '8': '#A21942', // 酒红色 - 体面工作和经济增长 Decent Work and Economic Growth
  '9': '#FD6925', // 橙色 - 产业、创新和基础设施 Industry, Innovation and Infrastructure
  '10': '#DD1367', // 洋红色 - 减少不平等 Reduced Inequality
  '11': '#FD9D24', // 橙色 - 可持续城市和社区 Sustainable Cities and Communities
  '12': '#BF8B2E', // 棕色 - 负责任消费和生产 Responsible Consumption and Production
  '13': '#3F7E44', // 深绿色 - 气候行动 Climate Action
  '14': '#0A97D9', // 蓝色 - 水下生物 Life Below Water
  '15': '#56C02B', // 绿色 - 陆地生物 Life on Land
  '16': '#00689D', // 深蓝色 - 和平、正义与强大机构 Peace, Justice and Strong Institutions
  '17': '#19486A'  // 海军蓝 - 促进目标实现的伙伴关系 Partnerships for the Goals
};

export { sdgColors };

const sdgNames = {
  '1': 'No Poverty',
  '2': 'Zero Hunger',
  '3': 'Good Health and Well-being',
  '4': 'Quality Education',
  '5': 'Gender Equality',
  '6': 'Clean Water and Sanitation',
  '7': 'Affordable and Clean Energy',
  '8': 'Decent Work and Economic Growth',
  '9': 'Industry, Innovation and Infrastructure',
  '10': 'Reduced Inequalities',
  '11': 'Sustainable Cities and Communities',
  '12': 'Responsible Consumption and Production',
  '13': 'Climate Action',
  '14': 'Life Below Water',
  '15': 'Life on Land',
  '16': 'Peace, Justice and Strong Institutions',
  '17': 'Partnerships for the Goals'
};
export { sdgNames };


// ========== SDG 指标映射配置 ==========
// 每个 SDG 的完整信息，包括目标名称和具体子指标

export const sdgIndicators = {
  '1': {
    goal: 'No Poverty',
    indicator: 'Indicator 1.3.1',
    description: 'Proportion of population covered by at least one social protection benefit, by sex (%)',
    series: 'SI_COV_BENFTS'
  },
  '2': {
    goal: 'Zero Hunger',
    indicator: 'Indicator 2.4.1',
    description: 'Progress toward productive and sustainable agriculture, trend score',
    series: 'AG_LND_SUST_PRXTS',
  },
  '3': {
    goal: 'Good Health and Well-being',
    indicator: 'Indicator 3.8.1',
    description: 'Universal health coverage (UHC) service coverage index',
    series: 'SH_ACS_UNHC_25'
  },
  '4': {
    goal: 'Quality Education',
    indicator: 'Indicator 4.1.2',
    description: 'Completion rate, by sex, location, wealth quintile and education level (%)',
    series: 'SE_TOT_CPLR'
  },
  '5': {
    goal: 'Gender Equality',
    indicator: 'Indicator 5.5.1',
    description: 'Proportion of seats held by women in national parliaments (% of total number of seats)',
    series: 'SG_GEN_PARL'
  },
  '6': {
    goal: 'Clean Water and Sanitation',
    indicator: 'Indicator 6.2.1',
    description: 'Proportion of population with basic handwashing facilities on premises, by urban/rural (%)',
    series: 'SH_SAN_HNDWSH'
  },
  '7': {
    goal: 'Affordable and Clean Energy',
    indicator: 'Indicator 7.1.1',
    description: 'Proportion of population with access to electricity, by urban/rural (%)',
    series: 'EG_ACS_ELEC'
  },
  '8': {
    goal: 'Decent Work and Economic Growth',
    indicator: 'Indicator 8.10.2',
    description: 'Proportion of adults (15 years and older) with an account at a financial institution or mobile-money-service provider, by sex (%)',
    series: 'FB_BNK_ACCSS'
  },
  '9': {
    goal: 'Industry, Innovation and Infrastructure',
    indicator: 'Indicator 9.2.2',
    description: 'Manufacturing employment as a proportion of total employment - 13th ICLS (%)',
    series: 'SL_TLF_MANF'
  },
  '10': {
    goal: 'Reduced Inequalities',
    indicator: 'Indicator 10.4.1',
    description: 'Labour share of GDP (%)',
    series: 'SL_EMP_GTOTL'
  },
  '11': {
    goal: 'Sustainable Cities and Communities',
    indicator: 'Indicator 11.2.1',
    description: 'Proportion of population that has convenient access to public transport (%)',
    series: 'SP_TRN_PUBL'
  },
  '12': {
    goal: 'Responsible Consumption and Production',
    indicator: 'Indicator 12.5.1',
    description: 'Proportion of municipal waste recycled (%)',
    series: 'EN_MWT_RCYR'
  },
  '13': {
    goal: 'Climate Action',
    indicator: 'Indicator 11.b.2 / 13.1.3',
    description: 'Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies (%)',
    series: 'SG_DSR_SILS'
  },
  '14': {
    goal: 'Life Below Water',
    indicator: 'Indicator 14.4.1',
    description: 'Proportion of fish stocks within biologically sustainable levels (not overexploited) (%)',
    series: 'ER_H2O_FWTL'
  },
  '15': {
    goal: 'Life on Land',
    indicator: 'Indicator 15.1.1',
    description: 'Forest area as a proportion of total land area (%)',
    series: 'AG_LND_FRST'
  },
  '16': {
    goal: 'Peace, Justice and Strong Institutions',
    indicator: 'Indicator 16.1.4',
    description: 'Proportion of population that feel safe walking alone around the area they live after dark (%)',
    series: 'VC_SNS_WALN_DRK'
  },
  '17': {
    goal: 'Partnerships for the Goals',
    indicator: 'Indicator 17.1.1',
    description: 'Total government revenue (budgetary central government) as a proportion of GDP (%)',
    series: 'GR_G14_GDP'
  }
};

/**
 * 获取 SDG 的指标信息
 * @param {string|number} sdg - SDG编号
 * @returns {Object} - 指标信息对象
 */
export function getSDGIndicator(sdg) {
  const key = String(sdg);
  return sdgIndicators[key] || null;
}

/**
 * 格式化 SDG 指标信息为 HTML（用于 tooltip）
 * @param {string|number} sdg - SDG编号
 * @returns {string} - HTML字符串
 */
export function formatIndicatorHTML(sdg) {
  const info = getSDGIndicator(sdg);
  if (!info) return 'No indicator information available';

  return `
    <div class="indicator-tooltip">
      <div class="indicator-code">
        <strong>${info.indicator}</strong>
      </div>
      <div class="indicator-description">
        ${info.description}
      </div>
      ${info.note ? `<div class="indicator-note">(${info.note})</div>` : ''}
    </div>
    <div class="indicator-series">
      <em>Data Series:</em> ${info.series}
    </div>
  `;
}

/**
 * 格式化 SDG 指标信息为纯文本（用于 title 属性）
 * @param {string|number} sdg - SDG编号
 * @returns {string} - 纯文本字符串
 */
export function formatIndicatorText(sdg) {
  const info = getSDGIndicator(sdg);
  if (!info) return 'No indicator information available';
  
  let text = `${info.indicator}\n${info.description}`;
  if (info.note) text += `\n(${info.note})`;
  return text;
}