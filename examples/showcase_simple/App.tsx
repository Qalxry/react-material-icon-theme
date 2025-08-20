import { useState } from 'react'
import { MaterialIcon, availableIcons, hasIcon, getIconSvg } from 'react-material-icon-theme'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  // 过滤图标
  const filteredIcons = availableIcons.filter(name => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 50) // 只显示前50个

  return (
    <>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>
          <MaterialIcon name="react" size={32} color="#61dafb" />
          React Material Icon Theme 测试
          <MaterialIcon name="typescript" size={32} color="#3178c6" />
        </h1>
        
        <div style={{ marginBottom: '20px' }}>
          <p>✅ 包安装成功！共有 <strong>{availableIcons.length}</strong> 个图标可用</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>🎨 常用图标展示</h2>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <MaterialIcon name="javascript" size={48} />
              <div style={{ fontSize: '12px' }}>JavaScript</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MaterialIcon name="typescript" size={48} color="#3178c6" />
              <div style={{ fontSize: '12px' }}>TypeScript</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MaterialIcon name="react" size={48} color="#61dafb" />
              <div style={{ fontSize: '12px' }}>React</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MaterialIcon name="nodejs" size={48} color="#339933" />
              <div style={{ fontSize: '12px' }}>Node.js</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MaterialIcon name="css" size={48} color="#1572B6" />
              <div style={{ fontSize: '12px' }}>CSS</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MaterialIcon name="html" size={48} color="#E34F26" />
              <div style={{ fontSize: '12px' }}>HTML</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>🌙 浅色主题测试</h2>
          <div style={{ display: 'flex', gap: '15px', backgroundColor: '#333', padding: '15px', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center' }}>
              <MaterialIcon name="copilot" light size={48} />
              <div style={{ fontSize: '12px', color: 'white' }}>Copilot Light</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MaterialIcon name="blink" light size={48} />
              <div style={{ fontSize: '12px', color: 'white' }}>Blink Light</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>🔍 图标搜索</h2>
          <input
            type="text"
            placeholder="搜索图标..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '300px',
              marginBottom: '15px'
            }}
          />
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
            gap: '15px',
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid #eee',
            padding: '15px',
            borderRadius: '8px'
          }}>
            {filteredIcons.map(name => (
              <div key={name} style={{ 
                textAlign: 'center', 
                padding: '10px',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <MaterialIcon name={name} size={32} />
                <div style={{ fontSize: '10px', marginTop: '5px', wordBreak: 'break-all' }}>
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>🛠 API 测试</h2>
          <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
            <p><strong>hasIcon('react'):</strong> {hasIcon('react') ? '✅ true' : '❌ false'}</p>
            <p><strong>hasIcon('nonexistent'):</strong> {hasIcon('nonexistent') ? '✅ true' : '❌ false'}</p>
            <p><strong>getIconSvg('react') 长度:</strong> {getIconSvg('react')?.length || 0} 字符</p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>🎛 交互测试</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <MaterialIcon 
              name="settings" 
              size={32} 
              style={{ cursor: 'pointer' }}
              onClick={() => alert('设置图标被点击！')}
            />
            <span>点击设置图标</span>
            
            <MaterialIcon 
              name="folder" 
              size={32} 
              color="#ffa500"
              style={{ cursor: 'pointer', marginLeft: '20px' }}
              onClick={() => alert('文件夹图标被点击！')}
            />
            <span>点击文件夹图标</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
          <h2>🎉 测试完成！</h2>
          <p>React Material Icon Theme 包运行正常！</p>
          <MaterialIcon name="verified" size={48} color="#4caf50" />
        </div>
      </div>
    </>
  )
}

export default App
