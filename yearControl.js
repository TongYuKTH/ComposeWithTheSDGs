let currentYear = 2015;  // 

export function setupYearControl() {
  const currentYearDis = document.getElementById('current_year');
  const yearIncrease = document.getElementById('increase_year');
  const yearDecrease = document.getElementById('decrease_year');

  // 检查元素是否存在
  if (!currentYearDis || !yearIncrease || !yearDecrease) {
    console.error(' 年份控制元素未找到，请检查HTML中的元素ID');
    return;
  }

  // 初始化显示
  currentYearDis.innerText = currentYear;

  // 增加年份
  yearIncrease.addEventListener('click', () => {
    if (currentYear < 2024) {
      currentYear++;
      currentYearDis.innerText = currentYear;
      console.log(' 年份增加到:', currentYear);
      
      // 触发自定义事件，通知其他组件年份已改变
      window.dispatchEvent(new CustomEvent('yearChanged', { 
        detail: { year: currentYear } 
      }));
    } else {
      console.log(' 已经是最大年份 2024');
    }
  });

  // 减少年份
  yearDecrease.addEventListener('click', () => {
    if (currentYear > 2015) {
      currentYear--;
      currentYearDis.innerText = currentYear;
      console.log(' 年份减少到:', currentYear);
      
      // 触发自定义事件
      window.dispatchEvent(new CustomEvent('yearChanged', { 
        detail: { year: currentYear } 
      }));
    } else {
      console.log(' 已经是最小年份 2015');
    }
  });
  
  console.log(' 年份控制初始化完成，当前年份:', currentYear);
}

export function getCurrentYear() {
  return currentYear;
}

// 新增：允许外部设置年份
export function setCurrentYear(year) {
  if (year >= 2015 && year <= 2024) {
    currentYear = year;
    const currentYearDis = document.getElementById('current_year');
    if (currentYearDis) {
      currentYearDis.innerText = currentYear;
    }
    
    // 触发年份改变事件
    window.dispatchEvent(new CustomEvent('yearChanged', { 
      detail: { year: currentYear } 
    }));
    
    console.log(' 年份已设置为:', currentYear);
  } else {
    console.error('无效的年份，必须在 2015-2024 之间');
  }
}