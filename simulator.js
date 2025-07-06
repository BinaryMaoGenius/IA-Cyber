// Simulateur d'Attaque Cybernétique
class CyberSecuritySimulator {
    constructor() {
        this.currentScenario = null;
        this.currentStep = 0;
        this.score = 0;
        this.maxScore = 100;
        this.userChoices = [];
        this.scenarios = this.initializeScenarios();
    }

    initializeScenarios() {
        return {
            'phishing': {
                title: 'Attaque de Phishing - Orange Money',
                description: 'Vous recevez un SMS suspect concernant votre compte Orange Money',
                totalSteps: 5,
                steps: [
                    {
                        type: 'sms',
                        content: {
                            sender: '+223 XX XX XX XX',
                            message: 'URGENT: Votre compte Orange Money sera bloqué dans 24h. Cliquez sur ce lien pour le débloquer: http://orange-mali-secure.com/debloquer',
                            timestamp: 'Aujourd\'hui 14:32'
                        },
                        question: 'Que remarquez-vous de suspect dans ce SMS ?',
                        options: [
                            { text: 'Le numéro d\'expéditeur semble étrange', correct: true, points: 20 },
                            { text: 'Le lien ne semble pas officiel', correct: true, points: 25 },
                            { text: 'Le message crée un sentiment d\'urgence', correct: true, points: 20 },
                            { text: 'Rien de suspect, c\'est normal', correct: false, points: 0 }
                        ],
                        explanation: 'Ce SMS présente plusieurs signes de phishing : numéro suspect, URL non officielle, et création d\'urgence pour pousser à l\'action.'
                    },
                    {
                        type: 'decision',
                        content: {
                            scenario: 'Vous avez identifié que le SMS est suspect. Quelle est votre prochaine action ?'
                        },
                        question: 'Que devez-vous faire maintenant ?',
                        options: [
                            { text: 'Cliquer sur le lien pour vérifier', correct: false, points: 0 },
                            { text: 'Supprimer le SMS et contacter Orange directement', correct: true, points: 25 },
                            { text: 'Transférer le SMS à mes contacts pour les prévenir', correct: false, points: 5 },
                            { text: 'Répondre au SMS pour demander des clarifications', correct: false, points: 0 }
                        ],
                        explanation: 'La meilleure action est de supprimer le SMS et de contacter Orange Mali directement via leurs canaux officiels.'
                    },
                    {
                        type: 'website',
                        content: {
                            url: 'orange-mali-secure.com',
                            title: 'Orange Mali - Sécurité',
                            content: 'Entrez vos identifiants Orange Money pour sécuriser votre compte',
                            warning_signs: ['URL non officielle', 'Pas de HTTPS', 'Design approximatif']
                        },
                        question: 'Si vous aviez cliqué sur le lien, qu\'auriez-vous remarqué ?',
                        options: [
                            { text: 'L\'URL n\'est pas celle d\'Orange Mali officiel', correct: true, points: 20 },
                            { text: 'Le site n\'utilise pas HTTPS (pas de cadenas)', correct: true, points: 15 },
                            { text: 'Le design semble différent du site officiel', correct: true, points: 10 },
                            { text: 'Tout semble normal', correct: false, points: 0 }
                        ],
                        explanation: 'Les sites de phishing imitent souvent les vrais sites mais avec des URLs différentes et sans sécurité HTTPS.'
                    },
                    {
                        type: 'prevention',
                        content: {
                            scenario: 'Comment pouvez-vous vous protéger à l\'avenir ?'
                        },
                        question: 'Quelles mesures préventives devez-vous adopter ?',
                        options: [
                            { text: 'Toujours vérifier l\'URL des sites web', correct: true, points: 15 },
                            { text: 'Ne jamais cliquer sur des liens dans des SMS suspects', correct: true, points: 20 },
                            { text: 'Contacter directement l\'entreprise en cas de doute', correct: true, points: 15 },
                            { text: 'Partager mes mots de passe avec ma famille', correct: false, points: 0 }
                        ],
                        explanation: 'La prévention passe par la vigilance, la vérification des sources et le contact direct avec les entreprises.'
                    },
                    {
                        type: 'action',
                        content: {
                            scenario: 'Vous voulez signaler cette tentative de phishing. Que faites-vous ?'
                        },
                        question: 'Comment signaler cette tentative d\'arnaque ?',
                        options: [
                            { text: 'Signaler à Orange Mali via leur service client', correct: true, points: 15 },
                            { text: 'Signaler aux autorités compétentes', correct: true, points: 10 },
                            { text: 'Prévenir mes proches et collègues', correct: true, points: 10 },
                            { text: 'Ne rien faire, c\'est trop compliqué', correct: false, points: 0 }
                        ],
                        explanation: 'Signaler les tentatives de phishing aide à protéger d\'autres utilisateurs et à lutter contre la cybercriminalité.'
                    }
                ]
            },
            'social-engineering': {
                title: 'Ingénierie Sociale - Appel Frauduleux',
                description: 'Vous recevez un appel d\'une personne se présentant comme un agent de banque',
                totalSteps: 4,
                steps: [
                    {
                        type: 'phone_call',
                        content: {
                            caller: 'Agent de la Banque Malienne',
                            message: 'Bonjour, je vous appelle de la Banque Malienne. Nous avons détecté des activités suspectes sur votre compte. Pour votre sécurité, j\'ai besoin de vérifier votre code PIN.',
                            tone: 'Professionnel mais pressant'
                        },
                        question: 'Quels sont les signaux d\'alarme dans cet appel ?',
                        options: [
                            { text: 'Demande d\'informations confidentielles par téléphone', correct: true, points: 25 },
                            { text: 'Création d\'un sentiment d\'urgence', correct: true, points: 20 },
                            { text: 'Pas de vérification de votre identité d\'abord', correct: true, points: 20 },
                            { text: 'Rien d\'anormal', correct: false, points: 0 }
                        ],
                        explanation: 'Les banques ne demandent jamais d\'informations confidentielles par téléphone sans procédure de vérification préalable.'
                    },
                    {
                        type: 'response',
                        content: {
                            scenario: 'L\'appelant insiste et dit que votre compte sera bloqué si vous ne coopérez pas.'
                        },
                        question: 'Quelle est la meilleure réponse ?',
                        options: [
                            { text: 'Donner mon code PIN pour éviter le blocage', correct: false, points: 0 },
                            { text: 'Raccrocher et appeler ma banque directement', correct: true, points: 30 },
                            { text: 'Demander à rappeler plus tard', correct: false, points: 5 },
                            { text: 'Donner un faux code PIN', correct: false, points: 0 }
                        ],
                        explanation: 'Raccrocher et contacter votre banque via leurs numéros officiels est la seule réponse sûre.'
                    },
                    {
                        type: 'verification',
                        content: {
                            scenario: 'Vous appelez votre banque avec le numéro officiel de votre carte bancaire.'
                        },
                        question: 'Que vous confirme votre banque ?',
                        options: [
                            { text: 'Aucune activité suspecte détectée', correct: true, points: 20 },
                            { text: 'Ils ne font jamais d\'appels pour demander des codes PIN', correct: true, points: 25 },
                            { text: 'C\'était effectivement une tentative d\'arnaque', correct: true, points: 20 },
                            { text: 'L\'appel était légitime', correct: false, points: 0 }
                        ],
                        explanation: 'Les banques confirment qu\'elles ne demandent jamais d\'informations sensibles par téléphone.'
                    },
                    {
                        type: 'education',
                        content: {
                            scenario: 'Vous voulez vous protéger contre de futures tentatives d\'ingénierie sociale.'
                        },
                        question: 'Quelles règles devez-vous retenir ?',
                        options: [
                            { text: 'Ne jamais donner d\'infos confidentielles par téléphone', correct: true, points: 25 },
                            { text: 'Toujours vérifier l\'identité de l\'appelant', correct: true, points: 20 },
                            { text: 'Prendre le temps de réfléchir, ne pas céder à la pression', correct: true, points: 20 },
                            { text: 'Faire confiance aux appelants professionnels', correct: false, points: 0 }
                        ],
                        explanation: 'La vigilance et la vérification sont vos meilleures défenses contre l\'ingénierie sociale.'
                    }
                ]
            },
            'mobile-security': {
                title: 'Sécurité Mobile - Applications Malveillantes',
                description: 'Vous découvrez une nouvelle application de paiement mobile très populaire',
                totalSteps: 4,
                steps: [
                    {
                        type: 'app_store',
                        content: {
                            app_name: 'Mali Pay Express',
                            description: 'Transferts d\'argent gratuits et instantanés au Mali',
                            downloads: '50K+ téléchargements',
                            rating: '4.8 étoiles',
                            permissions: ['Accès aux contacts', 'Accès aux SMS', 'Accès à la caméra', 'Accès aux fichiers']
                        },
                        question: 'Que devez-vous vérifier avant de télécharger cette application ?',
                        options: [
                            { text: 'Les permissions demandées par l\'application', correct: true, points: 25 },
                            { text: 'Les commentaires et avis des utilisateurs', correct: true, points: 20 },
                            { text: 'L\'identité du développeur', correct: true, points: 20 },
                            { text: 'Seulement le nombre de téléchargements', correct: false, points: 0 }
                        ],
                        explanation: 'Vérifiez toujours les permissions, les avis authentiques et l\'identité du développeur avant d\'installer une application.'
                    },
                    {
                        type: 'permissions',
                        content: {
                            scenario: 'L\'application demande l\'accès à vos SMS, contacts, et fichiers pour "améliorer l\'expérience utilisateur".'
                        },
                        question: 'Ces permissions sont-elles justifiées pour une app de paiement ?',
                        options: [
                            { text: 'Non, c\'est excessif pour une app de paiement', correct: true, points: 30 },
                            { text: 'Oui, c\'est normal pour toutes les applications', correct: false, points: 0 },
                            { text: 'Je ne sais pas, je vais accepter', correct: false, points: 0 },
                            { text: 'Je vais chercher une alternative plus sûre', correct: true, points: 25 }
                        ],
                        explanation: 'Une application de paiement légitime ne devrait pas avoir besoin d\'accéder à tous vos fichiers et contacts.'
                    },
                    {
                        type: 'research',
                        content: {
                            scenario: 'Vous recherchez des informations sur le développeur "Mali Tech Solutions" mais ne trouvez aucune information officielle.'
                        },
                        question: 'Que devez-vous faire ?',
                        options: [
                            { text: 'Ne pas installer l\'application', correct: true, points: 30 },
                            { text: 'Installer quand même, ça semble populaire', correct: false, points: 0 },
                            { text: 'Chercher des alternatives vérifiées', correct: true, points: 25 },
                            { text: 'Demander conseil à des experts', correct: true, points: 20 }
                        ],
                        explanation: 'L\'absence d\'informations sur le développeur est un signal d\'alarme majeur.'
                    },
                    {
                        type: 'best_practices',
                        content: {
                            scenario: 'Vous voulez adopter de bonnes pratiques pour la sécurité mobile.'
                        },
                        question: 'Quelles habitudes devez-vous adopter ?',
                        options: [
                            { text: 'Télécharger uniquement depuis les stores officiels', correct: true, points: 20 },
                            { text: 'Lire attentivement les permissions avant d\'installer', correct: true, points: 25 },
                            { text: 'Mettre à jour régulièrement vos applications', correct: true, points: 20 },
                            { text: 'Installer toutes les applications populaires', correct: false, points: 0 }
                        ],
                        explanation: 'La sécurité mobile nécessite vigilance dans le choix des apps et maintenance régulière.'
                    }
                ]
            },
            'password-security': {
                title: 'Sécurité des Mots de Passe',
                description: 'Apprenez à créer et gérer des mots de passe sécurisés',
                totalSteps: 4,
                steps: [
                    {
                        type: 'password_analysis',
                        content: {
                            passwords: [
                                { password: '123456', strength: 'Très faible' },
                                { password: 'motdepasse', strength: 'Très faible' },
                                { password: 'Mali2024!', strength: 'Moyen' },
                                { password: 'J\'aime#Bamako&2024', strength: 'Fort' }
                            ]
                        },
                        question: 'Quel mot de passe est le plus sécurisé ?',
                        options: [
                            { text: '123456', correct: false, points: 0 },
                            { text: 'motdepasse', correct: false, points: 0 },
                            { text: 'Mali2024!', correct: false, points: 10 },
                            { text: 'J\'aime#Bamako&2024', correct: true, points: 30 }
                        ],
                        explanation: 'Un mot de passe fort combine longueur, majuscules, minuscules, chiffres et caractères spéciaux.'
                    },
                    {
                        type: 'password_creation',
                        content: {
                            scenario: 'Créez un mot de passe pour votre compte Orange Money en utilisant une phrase de passe.'
                        },
                        question: 'Quelle méthode est la plus efficace ?',
                        options: [
                            { text: 'Utiliser une phrase personnelle avec modifications', correct: true, points: 25 },
                            { text: 'Utiliser votre date de naissance', correct: false, points: 0 },
                            { text: 'Utiliser le nom de votre ville', correct: false, points: 0 },
                            { text: 'Utiliser un générateur de mots de passe', correct: true, points: 30 }
                        ],
                        explanation: 'Les phrases de passe personnalisées ou les générateurs créent des mots de passe forts et mémorables.'
                    },
                    {
                        type: 'password_management',
                        content: {
                            scenario: 'Vous avez maintenant 15 comptes différents avec des mots de passe forts.'
                        },
                        question: 'Comment gérer tous ces mots de passe ?',
                        options: [
                            { text: 'Les écrire dans un carnet', correct: false, points: 5 },
                            { text: 'Utiliser le même mot de passe partout', correct: false, points: 0 },
                            { text: 'Utiliser un gestionnaire de mots de passe', correct: true, points: 30 },
                            { text: 'Les mémoriser tous', correct: false, points: 10 }
                        ],
                        explanation: 'Un gestionnaire de mots de passe est la solution la plus sûre pour gérer de nombreux mots de passe uniques.'
                    },
                    {
                        type: 'two_factor',
                        content: {
                            scenario: 'Votre banque propose l\'authentification à deux facteurs (2FA).'
                        },
                        question: 'Devez-vous l\'activer ?',
                        options: [
                            { text: 'Oui, c\'est une sécurité supplémentaire importante', correct: true, points: 30 },
                            { text: 'Non, c\'est trop compliqué', correct: false, points: 0 },
                            { text: 'Seulement pour les comptes importants', correct: false, points: 15 },
                            { text: 'Je ne sais pas ce que c\'est', correct: false, points: 0 }
                        ],
                        explanation: 'L\'authentification à deux facteurs ajoute une couche de sécurité cruciale à vos comptes.'
                    }
                ]
            }
        };
    }

    startScenario(scenarioId) {
        this.currentScenario = this.scenarios[scenarioId];
        this.currentStep = 0;
        this.score = 0;
        this.userChoices = [];
        
        document.getElementById('scenario-selection').style.display = 'none';
        document.getElementById('simulator-interface').style.display = 'block';
        document.getElementById('scenario-title').textContent = this.currentScenario.title;
        
        this.displayStep();
    }

    displayStep() {
        const step = this.currentScenario.steps[this.currentStep];
        const scenarioDisplay = document.getElementById('scenario-display');
        const actionButtons = document.getElementById('action-buttons');
        
        // Update progress
        const progress = ((this.currentStep + 1) / this.currentScenario.totalSteps) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('current-step').textContent = this.currentStep + 1;
        document.getElementById('total-steps').textContent = this.currentScenario.totalSteps;
        
        // Display step content
        scenarioDisplay.innerHTML = this.generateStepContent(step);
        
        // Generate action buttons
        actionButtons.innerHTML = '';
        step.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'action-button';
            button.textContent = option.text;
            button.onclick = () => this.selectOption(index);
            actionButtons.appendChild(button);
        });
    }

    generateStepContent(step) {
        switch (step.type) {
            case 'sms':
                return `
                    <div class="sms-interface">
                        <div class="sms-header">
                            <strong>SMS reçu de: ${step.content.sender}</strong>
                            <span class="timestamp">${step.content.timestamp}</span>
                        </div>
                        <div class="sms-body">
                            ${step.content.message}
                        </div>
                    </div>
                    <h3>${step.question}</h3>
                `;
            
            case 'email':
                return `
                    <div class="email-interface">
                        <div class="email-header">
                            <div class="email-from">De: ${step.content.from}</div>
                            <div class="email-subject">${step.content.subject}</div>
                        </div>
                        <div class="email-body">
                            ${step.content.body}
                        </div>
                    </div>
                    <h3>${step.question}</h3>
                `;
            
            case 'website':
                return `
                    <div class="website-interface">
                        <div class="browser-bar">
                            <span class="url">${step.content.url}</span>
                        </div>
                        <div class="website-content">
                            <h2>${step.content.title}</h2>
                            <p>${step.content.content}</p>
                        </div>
                    </div>
                    <h3>${step.question}</h3>
                `;
            
            case 'phone_call':
                return `
                    <div class="phone-interface">
                        <div class="call-header">
                            <strong>📞 Appel entrant de: ${step.content.caller}</strong>
                        </div>
                        <div class="call-content">
                            <p><em>"${step.content.message}"</em></p>
                            <small>Ton: ${step.content.tone}</small>
                        </div>
                    </div>
                    <h3>${step.question}</h3>
                `;
            
            case 'app_store':
                return `
                    <div class="app-interface">
                        <div class="app-header">
                            <h2>📱 ${step.content.app_name}</h2>
                            <div class="app-rating">⭐ ${step.content.rating}</div>
                        </div>
                        <div class="app-details">
                            <p>${step.content.description}</p>
                            <p><strong>Téléchargements:</strong> ${step.content.downloads}</p>
                            <p><strong>Permissions:</strong> ${step.content.permissions.join(', ')}</p>
                        </div>
                    </div>
                    <h3>${step.question}</h3>
                `;
            
            default:
                return `
                    <div class="scenario-content">
                        <p>${step.content.scenario}</p>
                    </div>
                    <h3>${step.question}</h3>
                `;
        }
    }

    selectOption(optionIndex) {
        const step = this.currentScenario.steps[this.currentStep];
        const selectedOption = step.options[optionIndex];
        
        this.userChoices.push({
            step: this.currentStep,
            option: optionIndex,
            correct: selectedOption.correct,
            points: selectedOption.points
        });
        
        this.score += selectedOption.points;
        
        // Show feedback
        this.showFeedback(selectedOption, step.explanation);
    }

    showFeedback(selectedOption, explanation) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-panel';
        feedbackDiv.innerHTML = `
            <div class="feedback-content">
                <div class="feedback-result ${selectedOption.correct ? 'correct' : 'incorrect'}">
                    ${selectedOption.correct ? '✅ Correct!' : '❌ Incorrect'}
                    <span class="points">+${selectedOption.points} points</span>
                </div>
                <div class="feedback-explanation">
                    <strong>Explication:</strong> ${explanation}
                </div>
                <button class="btn btn-primary" onclick="simulator.nextStep()">Continuer</button>
            </div>
        `;
        
        document.getElementById('scenario-display').appendChild(feedbackDiv);
        document.getElementById('action-buttons').style.display = 'none';
    }

    nextStep() {
        this.currentStep++;
        
        if (this.currentStep >= this.currentScenario.totalSteps) {
            this.showResults();
        } else {
            document.getElementById('action-buttons').style.display = 'flex';
            this.displayStep();
        }
    }

    showResults() {
        document.getElementById('simulator-interface').style.display = 'none';
        document.getElementById('results-section').style.display = 'block';
        
        const finalScore = Math.round((this.score / this.maxScore) * 100);
        document.getElementById('final-score').textContent = finalScore;
        
        this.generatePerformanceAnalysis();
        this.generateRecommendations();
    }

    generatePerformanceAnalysis() {
        const analysisDiv = document.getElementById('performance-analysis');
        const correctAnswers = this.userChoices.filter(choice => choice.correct).length;
        const totalQuestions = this.userChoices.length;
        
        let performance = '';
        if (correctAnswers / totalQuestions >= 0.8) {
            performance = 'Excellent';
        } else if (correctAnswers / totalQuestions >= 0.6) {
            performance = 'Bon';
        } else {
            performance = 'À améliorer';
        }
        
        analysisDiv.innerHTML = `
            <h3>Analyse de Performance</h3>
            <div class="performance-item">
                <span>Réponses correctes:</span>
                <span class="performance-status ${performance.toLowerCase()}">${correctAnswers}/${totalQuestions}</span>
            </div>
            <div class="performance-item">
                <span>Score total:</span>
                <span class="performance-status">${this.score}/${this.maxScore} points</span>
            </div>
            <div class="performance-item">
                <span>Niveau de sécurité:</span>
                <span class="performance-status ${performance.toLowerCase().replace(' ', '-')}">${performance}</span>
            </div>
        `;
    }

    generateRecommendations() {
        const recommendationsDiv = document.getElementById('recommendations');
        const scorePercentage = (this.score / this.maxScore) * 100;
        
        let recommendations = [];
        
        if (scorePercentage < 50) {
            recommendations = [
                'Consultez nos guides de base sur la cybersécurité',
                'Pratiquez régulièrement avec nos autres simulateurs',
                'Suivez une formation en cybersécurité',
                'Activez l\'authentification à deux facteurs sur vos comptes'
            ];
        } else if (scorePercentage < 80) {
            recommendations = [
                'Approfondissez vos connaissances avec nos ressources avancées',
                'Testez d\'autres scénarios pour élargir vos compétences',
                'Partagez vos connaissances avec votre entourage',
                'Restez informé des nouvelles menaces'
            ];
        } else {
            recommendations = [
                'Félicitations ! Vous avez un bon niveau de sécurité',
                'Continuez à vous tenir informé des nouvelles menaces',
                'Aidez d\'autres personnes à améliorer leur sécurité',
                'Explorez nos contenus sur l\'intelligence artificielle'
            ];
        }
        
        recommendationsDiv.innerHTML = `
            <h3>Recommandations Personnalisées</h3>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;
    }

    resetSimulator() {
        document.getElementById('simulator-interface').style.display = 'none';
        document.getElementById('results-section').style.display = 'none';
        document.getElementById('scenario-selection').style.display = 'block';
        
        this.currentScenario = null;
        this.currentStep = 0;
        this.score = 0;
        this.userChoices = [];
    }

    exitSimulator() {
        window.location.href = 'index.html';
    }

    shareResults() {
        const scorePercentage = Math.round((this.score / this.maxScore) * 100);
        const text = `J'ai obtenu ${scorePercentage}% au simulateur de cybersécurité de CyberSécurité & IA Mali ! 🛡️ Testez vos connaissances aussi : ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Mes résultats au simulateur de cybersécurité',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
            navigator.clipboard.writeText(text).then(() => {
                alert('Résultats copiés dans le presse-papiers !');
            });
        }
    }
}

// Initialisation du simulateur
const simulator = new CyberSecuritySimulator();

// Fonctions globales pour l'interface
function startScenario(scenarioId) {
    simulator.startScenario(scenarioId);
}

function resetSimulator() {
    simulator.resetSimulator();
}

function exitSimulator() {
    simulator.exitSimulator();
}

function shareResults() {
    simulator.shareResults();
}

// Initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simulateur de cybersécurité initialisé');
});

