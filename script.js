// 存储用户登录信息
let userInfo = {
    name: '',
    gender: '',
    age: '',
    zodiac: '',
    birthday: '',
    password: ''
};

// 存储主页卡1的选择答案
let card1Answers = {
    question1: '',
    question2: '',
    question3: '',
    wish: ''
};

// 存储主页卡2的填写内容
let card2Answers = {
    star: '',
    friend: '',
    gift: ''
};

// 主页卡3的题库
const card3QuestionBank = [
    {
        question: '圣诞节是哪一天?',
        options: ['12月24日', '12月25日', '12月26日', '1月1日'],
        answer: 'B'
    },
    {
        question: '圣诞老人住在哪里?',
        options: ['南极', '北极', '格陵兰', '冰岛'],
        answer: 'B'
    },
    {
        question: '圣诞树通常是什么树?',
        options: ['松树', '柏树', '冷杉', '云杉'],
        answer: 'C'
    },
    {
        question: '圣诞节的传统颜色是?',
        options: ['红色和绿色', '蓝色和白色', '金色和银色', '紫色和粉色'],
        answer: 'A'
    },
    {
        question: '圣诞老人的坐骑是什么?',
        options: ['马', '驴', '驯鹿', '雪橇犬'],
        answer: 'C'
    },
    {
        question: '圣诞袜挂在哪里?',
        options: ['门上', '壁炉旁', '床头', '窗户上'],
        answer: 'B'
    },
    {
        question: '圣诞节吃的传统食物是?',
        options: ['月饼', '粽子', '火鸡', '饺子'],
        answer: 'C'
    },
    {
        question: '"Jingle Bells"是什么?',
        options: ['圣诞歌曲', '圣诞装饰', '圣诞礼物', '圣诞游戏'],
        answer: 'A'
    },
    {
        question: '圣诞节源自哪个宗教?',
        options: ['佛教', '伊斯兰教', '基督教', '印度教'],
        answer: 'C'
    },
    {
        question: '圣诞节前夜叫什么?',
        options: ['圣诞夜', '平安夜', '狂欢夜', '祝福夜'],
        answer: 'B'
    }
];

// 主页卡3的随机题目和答案
let card3Questions = [];
let card3CurrentQuestion = 0;

// 主页卡4的谜语题库
const card4RiddleBank = [
    {
        question: '什么东西在冬天出现,会让孩子们欢呼雀跃?',
        options: ['雪花', '雨水', '阳光', '彩虹'],
        answer: 'A'
    },
    {
        question: '红衣白须的老人,驾着雪橇送礼物,猜猜他是谁?',
        options: ['圣诞老人', '财神爷', '福禄寿', '土地公'],
        answer: 'A'
    },
    {
        question: '圣诞节前夕,孩子们会在壁炉旁挂什么?',
        options: ['帽子', '袜子', '手套', '围巾'],
        answer: 'B'
    },
    {
        question: '身穿绿衣头戴星,装点节日最欢庆,猜一植物?',
        options: ['竹子', '松树', '圣诞树', '柳树'],
        answer: 'C'
    },
    {
        question: '叮叮当,叮叮当,铃儿响叮当,猜一首歌?',
        options: ['小星星', 'Jingle Bells', '新年好', '生日歌'],
        answer: 'B'
    },
    {
        question: '头上长角会飞翔,拉着雪橇送吉祥,猜一动物?',
        options: ['麋鹿', '驯鹿', '梅花鹿', '马鹿'],
        answer: 'B'
    },
    {
        question: '五颜六色挂树上,闪闪发光真漂亮,猜圣诞装饰?',
        options: ['灯笼', '彩灯', '气球', '丝带'],
        answer: 'B'
    },
    {
        question: '圆圆球球挂满树,红红绿绿好喜庆?',
        options: ['苹果', '橘子', '圣诞球', '灯笼'],
        answer: 'C'
    },
    {
        question: '白雪覆盖小房子,烟囱冒烟暖心窝?',
        options: ['冰屋', '雪屋', '姜饼屋', '木屋'],
        answer: 'C'
    },
    {
        question: '金色丝带系蝴蝶,里面藏着小惊喜?',
        options: ['信封', '礼盒', '盒子', '袋子'],
        answer: 'B'
    }
];

// 主页卡4的随机谜语和答案
let card4Riddles = [];
let card4CurrentRiddle = 0;
let card4CorrectButtonIndex = 0;

// 当前问题索引
let currentQuestion = 1;
let lastQuestion = 1; // 用于确认对话框返回

// 播放主页音乐
function playMainMusic() {
    const mainVideo = document.getElementById('mainBackground');
    const cardVideos = [
        document.getElementById('card1Video'),
        document.getElementById('card2Video'),
        document.getElementById('card3Video'),
        document.getElementById('card4Video')
    ];
    
    // 暂停主页卡1的背景音乐
    const card1Music = document.getElementById('card1Music');
    if (card1Music) {
        card1Music.pause();
    }
    
    // 静音所有卡片视频但继续播放
    cardVideos.forEach(video => {
        if (video) {
            video.muted = true;
            video.play().catch(e => {
                console.log('卡片视频播放失败:', e);
            });
        }
    });
    
    // 暂停所有问题页面的视频
    pauseAllQuestionVideos();
    
    // 播放主页音乐
    if (mainVideo) {
        mainVideo.muted = false;
        mainVideo.play().catch(e => {
            console.log('主页音乐播放失败:', e);
        });
    }
}

// 播放卡片音乐
function playCardMusic(cardNumber) {
    const mainVideo = document.getElementById('mainBackground');
    const cardVideo = document.getElementById(`card${cardNumber}Video`);
    const allCardVideos = [
        document.getElementById('card1Video'),
        document.getElementById('card2Video'),
        document.getElementById('card3Video'),
        document.getElementById('card4Video')
    ];
    
    // 暂停主页音乐
    if (mainVideo) {
        mainVideo.muted = true;
        mainVideo.pause();
    }
    
    // 暂停其他卡片音乐
    allCardVideos.forEach((video, index) => {
        if (video && (index + 1) !== cardNumber) {
            video.muted = true;
            video.pause();
        }
    });
    
    // 播放当前卡片音乐
    if (cardVideo) {
        cardVideo.muted = false;
        cardVideo.currentTime = 0; // 从头开始播放
        cardVideo.play().catch(e => {
            console.log('卡片音乐播放失败:', e);
        });
    }
}

// 播放主页卡1的背景音乐
function playCard1Music() {
    const card1Music = document.getElementById('card1Music');
    const mainVideo = document.getElementById('mainBackground');
    const cardVideos = [
        document.getElementById('card1Video'),
        document.getElementById('card2Video'),
        document.getElementById('card3Video'),
        document.getElementById('card4Video')
    ];
    
    // 暂停主页音乐
    if (mainVideo) {
        mainVideo.muted = true;
        mainVideo.pause();
    }
    
    // 暂停所有卡片视频
    cardVideos.forEach(video => {
        if (video) {
            video.muted = true;
            video.pause();
        }
    });
    
    // 播放主页卡1的背景音乐
    if (card1Music) {
        card1Music.currentTime = 0;
        card1Music.volume = 0.5; // 设置音量为50%
        card1Music.play().catch(e => {
            console.log('主页卡1音乐播放失败:', e);
        });
    }
}

// 暂停所有问题页面的视频
function pauseAllQuestionVideos() {
    const questionVideos = document.querySelectorAll('.question-video-bg');
    questionVideos.forEach(video => {
        if (video) {
            video.pause();
        }
    });
}

// 播放当前问题的视频背景
function playCurrentQuestionVideo(questionNum) {
    // 暂停所有问题视频
    pauseAllQuestionVideos();
    
    // 播放当前问题的视频
    const currentQuestion = document.getElementById(`question${questionNum}`);
    if (currentQuestion) {
        const video = currentQuestion.querySelector('.question-video-bg');
        if (video && video.querySelector('source').src) {
            video.currentTime = 0;
            video.play().catch(e => {
                console.log(`问题${questionNum}视频播放失败:`, e);
            });
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 登录页面时播放主页音乐
    const mainVideo = document.getElementById('mainBackground');
    if (mainVideo) {
        mainVideo.muted = false;
        mainVideo.play().catch(e => {
            console.log('登录页面音乐播放失败，需要用户交互:', e);
        });
    }
    
    // 登录表单提交
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // 主页卡片点击事件
    document.querySelectorAll('.card-wrapper').forEach(card => {
        card.addEventListener('click', function() {
            const cardNumber = this.getAttribute('data-card');
            showCardLogin(cardNumber);
        });
    });

    // 初始化3D层级检测
    init3DLayering();

    // 主页卡1登录
    document.getElementById('card1LoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputName = document.getElementById('card1Name').value.trim();
        if (inputName === userInfo.name) {
            const loginVideo = document.querySelector('#card1Page .card-page-video-bg');
            if (loginVideo) {
                loginVideo.pause();
            }
            
            document.getElementById('card1Page').classList.add('hidden');
            document.getElementById('card1Content').classList.remove('hidden');
            document.getElementById('backToMain').classList.remove('hidden');
            resetCard1Questions();
            
            // 播放主页卡1的背景音乐
            playCard1Music();
            
            // 播放第一个问题的视频背景
            playCurrentQuestionVideo(1);
        } else {
            alert('密码错误！名字不匹配。');
        }
    });

    // 主页卡2登录
    document.getElementById('card2LoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputBirthday = document.getElementById('card2Birthday').value;
        if (inputBirthday === userInfo.birthday) {
            const loginVideo = document.querySelector('#card2Page .card-page-video-bg');
            if (loginVideo) {
                loginVideo.pause();
            }
            
            document.getElementById('card2Page').classList.add('hidden');
            document.getElementById('card2Content').classList.remove('hidden');
            document.getElementById('backToMain').classList.remove('hidden');
            
            resetCard2Questions();
            playCardMusic(2);
            playCard2QuestionVideo(1);
        } else {
            alert('密码错误！生日不匹配。');
        }
    });

    // 主页卡3登录
    document.getElementById('card3LoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputZodiac = document.getElementById('card3Zodiac').value;
        if (inputZodiac === userInfo.zodiac) {
            const loginVideo = document.querySelector('#card3Page .card-page-video-bg');
            if (loginVideo) {
                loginVideo.pause();
            }
            
            document.getElementById('card3Page').classList.add('hidden');
            document.getElementById('card3Content').classList.remove('hidden');
            document.getElementById('backToMain').classList.remove('hidden');
            
            // 初始化主页卡3的题目
            initCard3Questions();
            
            playCardMusic(3);
            const card3ContentVideo = document.querySelector('#card3Content .question-video-bg');
            if (card3ContentVideo) {
                card3ContentVideo.play().catch(e => {
                    console.log('卡片3内容视频播放失败:', e);
                });
            }
        } else {
            alert('密码错误!星座不匹配。');
        }
    });

    // 主页卡4登录
    document.getElementById('card4LoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputPassword = document.getElementById('card4Password').value.trim();
        if (inputPassword === userInfo.password) {
            const loginVideo = document.querySelector('#card4Page .card-page-video-bg');
            if (loginVideo) {
                loginVideo.pause();
            }
            
            document.getElementById('card4Page').classList.add('hidden');
            document.getElementById('card4Content').classList.remove('hidden');
            document.getElementById('backToMain').classList.remove('hidden');
            
            // 初始化主页卡4的谜语
            initCard4Riddles();
            
            playCardMusic(4);
        } else {
            alert('密码错误!');
        }
    });
});

// 处理登录
function handleLogin() {
    userInfo.name = document.getElementById('name').value.trim();
    userInfo.gender = document.getElementById('gender').value;
    userInfo.age = document.getElementById('age').value;
    userInfo.zodiac = document.getElementById('zodiac').value;
    userInfo.birthday = document.getElementById('birthday').value;
    userInfo.password = document.getElementById('password').value.trim();

    // 隐藏登录页面,显示加载页面
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('loadingPage').classList.remove('hidden');
    
    // 开始播放主页背景音乐
    const mainVideo = document.getElementById('mainBackground');
    if (mainVideo) {
        mainVideo.muted = false;
        mainVideo.currentTime = 0;
        mainVideo.play().catch(e => {
            console.log('加载页面音乐播放失败:', e);
        });
    }
    
    // 开始进度条动画
    startLoadingProgress();
}

// 开始加载进度
function startLoadingProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 1;
        progressFill.style.width = progress + '%';
        progressPercent.textContent = progress;
        
        if (progress >= 100) {
            clearInterval(interval);
            // 加载完成,进入主页
            setTimeout(() => {
                document.getElementById('loadingPage').classList.add('hidden');
                document.getElementById('mainPage').classList.remove('hidden');
                document.getElementById('backToLogin').classList.remove('hidden');
                
                // 启动卡片视频播放
                const cardVideos = [
                    document.getElementById('card1Video'),
                    document.getElementById('card2Video'),
                    document.getElementById('card3Video'),
                    document.getElementById('card4Video')
                ];
                
                cardVideos.forEach(video => {
                    if (video) {
                        video.muted = true;
                        video.play().catch(e => {
                            console.log('卡片视频播放失败:', e);
                        });
                    }
                });
            }, 300);
        }
    }, 30);
}

// 显示卡片登录页面
function showCardLogin(cardNumber) {
    const clickedCard = document.querySelector(`.card-wrapper[data-card="${cardNumber}"]`);
    
    if (clickedCard) {
        clickedCard.classList.add('card-expanding');
    }
    
    setTimeout(() => {
        // 暂停主页音乐
        const mainVideo = document.getElementById('mainBackground');
        if (mainVideo) {
            mainVideo.muted = true;
            mainVideo.pause();
        }
        
        document.getElementById('mainPage').classList.add('hidden');
        document.getElementById(`card${cardNumber}Page`).classList.remove('hidden');
        document.getElementById('backToLogin').classList.add('hidden');
        document.getElementById('backToMain').classList.add('hidden');
        
        // 播放登录页面的视频背景音乐
        const loginPageVideo = document.querySelector(`#card${cardNumber}Page .card-page-video-bg`);
        if (loginPageVideo) {
            loginPageVideo.muted = false;
            loginPageVideo.currentTime = 0;
            loginPageVideo.play().catch(e => {
                console.log(`登录页面${cardNumber}视频播放失败:`, e);
            });
        }
        
        if (clickedCard) {
            clickedCard.classList.remove('card-expanding');
        }
    }, 600);
}

// 返回主页
function backToMain() {
    document.querySelectorAll('.card-page').forEach(page => {
        page.classList.add('hidden');
    });
    document.querySelectorAll('.card-content-page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById('generatedCard').classList.add('hidden');
    document.getElementById('card2GiftBox').classList.add('hidden');
    
    // 暂停主页卡1的背景音乐
    const card1Music = document.getElementById('card1Music');
    if (card1Music) {
        card1Music.pause();
    }
    
    pauseAllQuestionVideos();
    
    document.querySelectorAll('.card-page-video-bg').forEach(video => {
        video.pause();
    });
    
    const generatedCardVideo = document.querySelector('.generated-card-video-bg');
    if (generatedCardVideo) {
        generatedCardVideo.pause();
    }
    
    document.querySelectorAll('form').forEach(form => {
        form.reset();
    });
    
    // 显示主页和返回登录按钮
    document.getElementById('mainPage').classList.remove('hidden');
    document.getElementById('backToLogin').classList.remove('hidden');
    document.getElementById('backToMain').classList.add('hidden');
    
    playMainMusic();
}

// 返回登录页面
function backToLogin() {
    // 暂停主页音乐
    const mainVideo = document.getElementById('mainBackground');
    if (mainVideo) {
        mainVideo.pause();
    }
    
    // 隐藏主页,显示登录页
    document.getElementById('mainPage').classList.add('hidden');
    document.getElementById('backToLogin').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

// 主页卡1的选择处理
function selectOption(questionNum, answer) {
    if (questionNum === 1) {
        if (answer === 'happy') {
            card1Answers.question1 = '开心';
            showQuestion(2);
        } else {
            card1Answers.question1 = '不开心';
            showConfirmDialog(1);
        }
    } else if (questionNum === 2) {
        if (answer === 'like') {
            card1Answers.question2 = '喜欢';
            showQuestion(3);
        } else {
            card1Answers.question2 = '不喜欢';
            showConfirmDialog(2);
        }
    } else if (questionNum === 3) {
        if (answer === 'yes') {
            card1Answers.question3 = '想';
            showQuestion(4);
        } else {
            card1Answers.question3 = '不想';
            showConfirmDialog(3);
        }
    }
}

// 显示问题
function showQuestion(questionNum) {
    document.querySelectorAll('.question').forEach(q => {
        q.classList.remove('active');
    });
    document.getElementById(`question${questionNum}`).classList.add('active');
    currentQuestion = questionNum;
    
    playCurrentQuestionVideo(questionNum);
}

// 显示确认对话框
function showConfirmDialog(questionNum) {
    lastQuestion = questionNum;
    document.getElementById('confirmDialog').classList.remove('hidden');
}

// 确认对话框处理
function confirmDialog() {
    document.getElementById('confirmDialog').classList.add('hidden');
    showQuestion(lastQuestion);
}

// 重置主页卡1的问题
function resetCard1Questions() {
    currentQuestion = 1;
    card1Answers = {
        question1: '',
        question2: '',
        question3: '',
        wish: ''
    };
    showQuestion(1);
}

// 生成圣诞卡
function generateCard() {
    const wish = document.getElementById('wishContent').value;
    card1Answers.wish = wish;

    let cardInfoHTML = `
        <h3 style="color: #d32f2f; margin-bottom: 20px;">你的个人信息</h3>
        <p><strong>姓名：</strong>${userInfo.name}</p>
        <p><strong>性别：</strong>${userInfo.gender}</p>
        <p><strong>年龄：</strong>${userInfo.age}</p>
        <p><strong>星座：</strong>${userInfo.zodiac}</p>
        <p><strong>生日：</strong>${userInfo.birthday}</p>
        <hr style="margin: 20px 0; border: 1px solid #ddd;">
        <h3 style="color: #d32f2f; margin-bottom: 20px;">你的选择</h3>
        <p><strong>这个冬天你开心吗：</strong>${card1Answers.question1}</p>
        <p><strong>你是否喜欢圣诞节：</strong>${card1Answers.question2}</p>
        <p><strong>你想写入圣诞卡吗：</strong>${card1Answers.question3}</p>
        <hr style="margin: 20px 0; border: 1px solid #ddd;">
        <h3 style="color: #d32f2f; margin-bottom: 20px;">你的心愿</h3>
        <p style="font-style: italic; color: #666;">${wish || '无'}</p>
    `;

    document.getElementById('cardInfo').innerHTML = cardInfoHTML;
    document.getElementById('card1Content').classList.add('hidden');
    document.getElementById('generatedCard').classList.remove('hidden');
    
    pauseAllQuestionVideos();
    
    // 继续播放主页卡1的背景音乐
    const card1Music = document.getElementById('card1Music');
    if (card1Music && card1Music.paused) {
        card1Music.play().catch(e => {
            console.log('生成卡片页面音乐播放失败:', e);
        });
    }
    
    const generatedCardVideo = document.querySelector('.generated-card-video-bg');
    if (generatedCardVideo) {
        generatedCardVideo.currentTime = 0;
        generatedCardVideo.play().catch(e => {
            console.log('生成卡片页面视频播放失败:', e);
        });
    }
}

// 主页卡2的问题导航
function card2NextQuestion(currentQuestionNum) {
    if (currentQuestionNum === 1) {
        const star = document.getElementById('card2Star').value.trim();
        if (star) {
            card2Answers.star = star;
            showCard2Question(2);
        } else {
            alert('请输入明星名字');
        }
    } else if (currentQuestionNum === 2) {
        const friend = document.getElementById('card2Friend').value.trim();
        if (friend) {
            card2Answers.friend = friend;
            showCard2Question(3);
        } else {
            alert('请输入朋友名字');
        }
    } else if (currentQuestionNum === 3) {
        const gift = document.getElementById('card2Gift').value.trim();
        if (gift) {
            card2Answers.gift = gift;
            showCard2Question(4);
        } else {
            alert('请输入你想要的礼物');
        }
    }
}

// 显示主页卡2的问题
function showCard2Question(questionNum) {
    const questions = document.querySelectorAll('#card2Content .question');
    questions.forEach(q => q.classList.remove('active'));
    document.getElementById(`card2Question${questionNum}`).classList.add('active');
    
    playCard2QuestionVideo(questionNum);
}

// 播放主页卡2的问题视频
function playCard2QuestionVideo(questionNum) {
    const allVideos = document.querySelectorAll('#card2Content .question-video-bg');
    allVideos.forEach(video => video.pause());
    
    const currentVideo = document.querySelector(`#card2Question${questionNum} .question-video-bg`);
    if (currentVideo) {
        currentVideo.currentTime = 0;
        currentVideo.play().catch(e => {
            console.log(`主页卡2问题${questionNum}视频播放失败:`, e);
        });
    }
}

// 生成主页卡2的礼物
function card2GenerateGift(shouldGenerate) {
    if (shouldGenerate) {
        let giftInfoHTML = `
            <h3 style="color: #d32f2f; margin-bottom: 20px;">礼物信息</h3>
            <p><strong>最喜欢的明星：</strong>${card2Answers.star}</p>
            <p><strong>最喜欢的朋友：</strong>${card2Answers.friend}</p>
            <hr style="margin: 20px 0; border: 1px solid #ddd;">
            <h3 style="color: #d32f2f; margin-bottom: 20px;">你的礼物愿望</h3>
            <p style="font-style: italic; color: #666;">${card2Answers.gift}</p>
            <hr style="margin: 20px 0; border: 1px solid #ddd;">
            <p style="text-align: center; font-size: 1.2em; color: #d32f2f; margin-top: 20px;">🎅 圣诞老人已经收到了你的愿望！🎄</p>
        `;
        
        document.getElementById('card2GiftInfo').innerHTML = giftInfoHTML;
        document.getElementById('card2Content').classList.add('hidden');
        document.getElementById('card2GiftBox').classList.remove('hidden');
        
        const allVideos = document.querySelectorAll('#card2Content .question-video-bg');
        allVideos.forEach(video => video.pause());
        
        const giftBoxVideo = document.querySelector('#card2GiftBox .generated-card-video-bg');
        if (giftBoxVideo) {
            giftBoxVideo.currentTime = 0;
            giftBoxVideo.play().catch(e => {
                console.log('礼物盒视频播放失败:', e);
            });
        }
    } else {
        backToMain();
    }
}

// 重置主页卡2的问题
function resetCard2Questions() {
    card2Answers = {
        star: '',
        friend: '',
        gift: ''
    };
    showCard2Question(1);
}

// 初始化3D层级检测
function init3DLayering() {
    const cardsContainer = document.querySelector('.cards-container');
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    
    if (!cardsContainer || cardWrappers.length === 0) return;
    
    const animationDuration = 20000;
    const cardRadius = 500;
    
    const cardAngles = {
        1: 0,
        2: 90,
        3: 180,
        4: 270
    };
    
    let animationStartTime = null;
    let isRunning = false;
    
    function updateCardLayering(timestamp) {
        const mainPage = document.getElementById('mainPage');
        if (mainPage.classList.contains('hidden')) {
            isRunning = false;
            animationStartTime = null;
            return;
        }
        
        if (!isRunning) {
            isRunning = true;
            animationStartTime = timestamp || performance.now();
        }
        
        if (!animationStartTime) {
            animationStartTime = timestamp || performance.now();
        }
        
        const elapsed = (timestamp - animationStartTime) % animationDuration;
        const progress = elapsed / animationDuration;
        const containerRotation = progress * 360;
        
        cardWrappers.forEach(wrapper => {
            const cardNum = parseInt(wrapper.getAttribute('data-card'));
            const initialAngle = cardAngles[cardNum];
            const currentAngle = (initialAngle + containerRotation) % 360;
            const radians = (currentAngle * Math.PI) / 180;
            const zPosition = Math.cos(radians) * cardRadius;
            
            if (zPosition > 0) {
                wrapper.classList.add('in-front');
                wrapper.classList.remove('behind');
            } else {
                wrapper.classList.add('behind');
                wrapper.classList.remove('in-front');
            }
        });
        
        requestAnimationFrame(updateCardLayering);
    }
    
    const mainPage = document.getElementById('mainPage');
    const observer = new MutationObserver(function(mutations) {
        if (!mainPage.classList.contains('hidden')) {
            if (!isRunning) {
                animationStartTime = null;
                requestAnimationFrame(updateCardLayering);
            }
        } else {
            isRunning = false;
            animationStartTime = null;
        }
    });
    
    observer.observe(mainPage, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    if (!mainPage.classList.contains('hidden')) {
        requestAnimationFrame(updateCardLayering);
    }
}

// 初始化主页卡3的题目
function initCard3Questions() {
    // 从题库中随机选择3道不重复的题目
    const shuffled = [...card3QuestionBank].sort(() => Math.random() - 0.5);
    card3Questions = shuffled.slice(0, 3);
    card3CurrentQuestion = 0;
    
    // 显示第一道题
    showCard3Question(0);
}

// 显示主页卡3的指定题目
function showCard3Question(index) {
    // 隐藏所有问题和祝福页面
    document.getElementById('card3Question1').classList.remove('active');
    document.getElementById('card3Question2').classList.remove('active');
    document.getElementById('card3Question3').classList.remove('active');
    document.getElementById('card3Blessing').classList.remove('active');
    
    if (index < 3) {
        // 显示题目
        const questionDiv = document.getElementById(`card3Question${index + 1}`);
        questionDiv.classList.add('active');
        
        const q = card3Questions[index];
        document.getElementById(`card3Q${index + 1}Text`).textContent = q.question;
        document.getElementById(`card3Q${index + 1}OptionA`).textContent = q.options[0];
        document.getElementById(`card3Q${index + 1}OptionB`).textContent = q.options[1];
        document.getElementById(`card3Q${index + 1}OptionC`).textContent = q.options[2];
        document.getElementById(`card3Q${index + 1}OptionD`).textContent = q.options[3];
    } else {
        // 显示祝福页面
        document.getElementById('card3Blessing').classList.add('active');
    }
}

// 主页卡3回答问题
function card3AnswerQuestion(questionIndex, userAnswer) {
    const q = card3Questions[questionIndex - 1];
    
    if (userAnswer === q.answer) {
        // 答对了
        if (questionIndex < 3) {
            // 继续下一题
            card3CurrentQuestion = questionIndex;
            showCard3Question(questionIndex);
        } else {
            // 三题都答对了,显示祝福语
            showCard3Question(3);
        }
    } else {
        // 答错了,提示重新选择
        alert('答案不正确,请重新选择!');
    }
}

// 初始化主页卡4的谜语
function initCard4Riddles() {
    // 从题库中随机选择3道不重复的谜语
    const shuffled = [...card4RiddleBank].sort(() => Math.random() - 0.5);
    card4Riddles = shuffled.slice(0, 3);
    card4CurrentRiddle = 0;
    
    // 显示第一道谜语
    showCard4Riddle(0);
}

// 显示主页卡4的指定谜语
function showCard4Riddle(index) {
    // 隐藏所有谜语和页面
    document.getElementById('card4Riddle1').classList.remove('active');
    document.getElementById('card4Riddle2').classList.remove('active');
    document.getElementById('card4Riddle3').classList.remove('active');
    document.getElementById('card4RandomButtons').classList.remove('active');
    document.getElementById('card4FinalBlessing').classList.remove('active');
    
    if (index < 3) {
        // 显示谜语
        const riddleDiv = document.getElementById(`card4Riddle${index + 1}`);
        riddleDiv.classList.add('active');
        
        const r = card4Riddles[index];
        document.getElementById(`card4R${index + 1}Text`).textContent = r.question;
        document.getElementById(`card4R${index + 1}OptionA`).textContent = r.options[0];
        document.getElementById(`card4R${index + 1}OptionB`).textContent = r.options[1];
        document.getElementById(`card4R${index + 1}OptionC`).textContent = r.options[2];
        document.getElementById(`card4R${index + 1}OptionD`).textContent = r.options[3];
    } else if (index === 3) {
        // 显示随机按钮页面
        document.getElementById('card4RandomButtons').classList.add('active');
        initCard4RandomButtons();
    } else {
        // 显示最终祝福页面
        document.getElementById('card4FinalBlessing').classList.add('active');
        
        // 播放最终祝福页面的视频
        const finalVideo = document.querySelector('#card4FinalBlessing .question-video-bg');
        if (finalVideo) {
            finalVideo.currentTime = 0;
            finalVideo.play().catch(e => {
                console.log('最终祝福视频播放失败:', e);
            });
        }
    }
}

// 主页卡4回答谜语
function card4AnswerRiddle(riddleIndex, userAnswer) {
    const r = card4Riddles[riddleIndex - 1];
    
    if (userAnswer === r.answer) {
        // 答对了
        if (riddleIndex < 3) {
            // 继续下一题
            card4CurrentRiddle = riddleIndex;
            showCard4Riddle(riddleIndex);
        } else {
            // 三题都答对了,显示随机按钮页面
            showCard4Riddle(3);
        }
    } else {
        // 答错了,提示重新选择
        alert('答案不正确,请重新选择!');
    }
}

// 初始化随机按钮
function initCard4RandomButtons() {
    const container = document.getElementById('card4RandomButtonsContainer');
    container.innerHTML = '';
    
    // 创建9个按钮
    const totalButtons = 9;
    card4CorrectButtonIndex = Math.floor(Math.random() * totalButtons);
    
    for (let i = 0; i < totalButtons; i++) {
        const btn = document.createElement('button');
        btn.textContent = '?';
        btn.style.fontSize = '2em';
        btn.style.padding = '20px';
        btn.onclick = function() {
            card4ClickRandomButton(i, this);
        };
        container.appendChild(btn);
    }
}

// 点击随机按钮
function card4ClickRandomButton(index, buttonElement) {
    if (index === card4CorrectButtonIndex) {
        // 猜对了,显示最终祝福
        showCard4Riddle(4);
    } else {
        // 猜错了,隐藏该按钮
        buttonElement.style.visibility = 'hidden';
    }
}