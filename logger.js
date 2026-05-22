// =============== Interaction Logger Module ===============
// 用于用户实验的交互日志记录

class InteractionLogger {
  constructor() {
    this.sessionId = null;
    this.startTime = null;
    this.endTime = null;
    this.events = [];
    this.isRecording = false;
  }

  /**
   * 开始记录会话
   * @param {string} sessionId - 参与者编号，如 "P01"
   */
  startSession(sessionId) {
    this.sessionId = sessionId || this.generateSessionId();
    this.startTime = Date.now();
    this.endTime = null;
    this.events = [];
    this.isRecording = true;
    
    this.log('session_start', {});
    
    console.log(`[Logger] Session started - ${this.sessionId}`);
    return this.sessionId;
  }

  /**
   * 结束记录会话并导出数据
   */
  endSession() {
    if (!this.isRecording) {
      console.warn('[Logger] No active session to end');
      return null;
    }

    this.log('session_end', {});
    this.endTime = Date.now();
    this.isRecording = false;

    const logData = this.exportData();
    this.downloadCSV(logData);

    console.log(`[Logger] Session ended - ${this.sessionId}`);
    console.log(`[Logger] Total events recorded: ${this.events.length}`);
    
    return logData;
  }

  /**
   * 记录事件
   * @param {string} eventType - 事件类型
   * @param {object} data - 事件数据
   */
  log(eventType, data = {}) {
    if (!this.isRecording && eventType !== 'session_start') {
      // 未开始记录时，静默忽略（不打印警告）
      return;
    }

    const event = {
      timestamp: Date.now(),
      event: eventType,
      data: data
    };

    this.events.push(event);
    
    // 开发调试用
    console.log(`[Log] ${eventType}`, data);
  }

  /**
   * 导出日志数据
   */
  exportData() {
    return {
      sessionId: this.sessionId,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.endTime ? this.endTime - this.startTime : null,
      totalEvents: this.events.length,
      events: this.events
    };
  }

  /**
   * 将事件数据转换为 CSV 格式
   */
  toCSV() {
    // CSV 表头
    const headers = [
      'session_id',
      'time_elapsed_sec',
      'timestamp_readable',
      'event',
      'sdg',
      'year',
      'iso',
      'country',
      'position',
      'sdgs',
      'values',
      'from_position',
      'to_position',
      'dragged_country',
      'dragged_iso',
      'target_country',
      'target_iso',
      'tempo',
      'note_count',
      'note_count_before',
      'duration',
      'mode'
    ];
    
    const rows = [headers.join(',')];
    
    this.events.forEach(event => {
      const data = event.data || {};
      const timestampReadable = new Date(event.timestamp).toISOString();
      const timeElapsedSec = ((event.timestamp - this.startTime) / 1000).toFixed(2);
      
      const row = [
        this.sessionId,
        timeElapsedSec,
        timestampReadable,
        event.event,
        data.sdg || '',
        data.year || '',
        data.iso || '',
        data.country || '',
        data.position !== undefined ? data.position : '',
        data.sdgs ? data.sdgs.join(';') : '',
        data.values ? data.values.join(';') : '',
        data.fromPosition !== undefined ? data.fromPosition : '',
        data.toPosition !== undefined ? data.toPosition : '',
        data.draggedCountry || '',
        data.draggedIso || '',
        data.targetCountry || '',
        data.targetIso || '',
        data.tempo || '',
        data.noteCount !== undefined ? data.noteCount : '',
        data.noteCountBefore !== undefined ? data.noteCountBefore : '',
        data.duration !== undefined ? data.duration : '',
        data.mode || ''
      ];
      
      // 转义包含逗号或引号的字段
      const escapedRow = row.map(field => {
        const str = String(field);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      });
      
      rows.push(escapedRow.join(','));
    });
    
    return rows.join('\n');
  }

  /**
   * 下载 CSV 日志文件
   */
  downloadCSV(logData) {
    const csvContent = this.toCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `${this.sessionId}.csv`;
    link.href = url;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log(`[Logger] CSV file downloaded - ${link.download}`);
  }

  /**
   * 生成默认 Session ID
   */
  generateSessionId() {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = now.toTimeString().slice(0, 5).replace(':', '');
    return `session_${dateStr}_${timeStr}`;
  }

  /**
   * 检查是否正在记录
   */
  isActive() {
    return this.isRecording;
  }

  /**
   * 获取当前会话统计
   */
  getStats() {
    if (!this.isRecording) return null;
    
    const eventCounts = {};
    this.events.forEach(e => {
      eventCounts[e.event] = (eventCounts[e.event] || 0) + 1;
    });
    
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.startTime,
      totalEvents: this.events.length,
      eventCounts: eventCounts
    };
  }
}

// 创建全局单例
const logger = new InteractionLogger();

// 导出
export { logger };
export default logger;