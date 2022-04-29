// QUESTIONS
const questions = [
	{
		question: "Why do you want to get a pet?",
		answer1: "I'm looking for a BFF to share outdoor adventures with.",
		answer1Total: "1",
		answer2: "I'm searching for the perfect roomate: fun, clean and a good listener.",
		answer2Total: "2",
		answer3: "I'd like a pet just like me: chirpy and quirky.",
		answer3Total: "4",
		answer4: "I'd like to come home to some low-key company after a long time.",
		answer4Total: "3",
		answer5: "I'm looking for a pint-sized companion.",
		answer5Total: "6"
	},
	{
		question: " How much time are you able to devote to your new friend?",
		answer1: "Tons! I'm flexible with my scheduling and plan to hire help when necessary.",
		answer1Total: "1",
		answer2: "Plenty. I am a homebody and know a great pet sitter who can back me up.",
		answer2Total: "1",
		answer3: "I have very little time available for interaction or daily care.",
		answer3Total: "5",
		answer4: "Occasionally, my schedule gets busy, but I can find an extra hour or two each day. ",
		answer4Total: "6",
		answer5: "Not a lot. My calendar is usually very full.",
		answer5Total: "3"
	},
	{
		question: "What's your home like?",
		answer1: "The space is perfect for me, but I don't think I want a pet roaming around.",
		answer1Total: "5",
		answer2: "My home has a lot of room, plus a backyard.",
		answer2Total: "1",
		answer3: "Cozy, with an abundance of sunny windowsills.",
		answer3Total: "2",
		answer4: "I love it and I'm confident that I don't want a pet roaming around.",
		answer4Total: "5",
		answer5: "It's pretty cool, with plenty of perches.",
		answer5Total: "4"
	},
	{
		question: "How much training are you willing to do?",
		answer1: "As much as it takes. I plan to work with a trainer and am looking forward to learning along with my pet.",
		answer1Total: "1",
		answer2: "I'm not against training, but I wasn't planning on it.",
		answer2Total: "2",
		answer3: "I'd prefer a pet that doesn't require any training.",
		answer3Total: "5",
		answer4: "A good amount. I'm prepared for the basics, and anything else that might benefit my pet.",
		answer4Total: "4",
		answer5: "A little bit. Tricks sound especially fun!",
		answer5Total: "4"
	},
	{
		question: "How much cleaning are you willing to do?",
		answer1: "As long as most of the mess remains in a cage, I don't mind.",
		answer1Total: "5",
		answer2: "I'm OK with muddy paws and the occasional chewed up cushion.",
		answer2Total: "1",
		answer3: "I've been called a neat freak, and I'm looking for a similar pet.",
		answer3Total: "4",
		answer4: "Habitat maintanance is fine, but anything beyond that is a deal breaker.",
		answer4Total: "4",
		answer5: "The occasional spill or shedding won't bother me.",
		answer5Total: "1"
	},
	{
		question: "How much money can you spend every month?",
		answer1: "I can afford start-up supplies and inexpensive recurring costs.",
		answer1Total: "1",
		answer2: "Not much, I'd like to avoid any major expenses.",
		answer2Total: "1",
		answer3: "After the initial costs of a habitat and supplies, I'd like to spend very little.",
		answer3Total: "1",
		answer4: "A lot. In addition to budgeting for the basics, I plan to have an emergency fund set aside.",
		answer4Total: "1",
		answer5: "Quite a bit. I can afford both routine and unexpected costs, if necessary.",
		answer5Total: "1"
	},
	{
		question: "What are you looking for in a pet?",
		answer1: "Something odd that I can show off.",
		answer1Total: "5",
		answer2: "Something to keep me occupied.",
		answer2Total: "2",
		answer3: "A pet to cuddle and keep me company.",
		answer3Total: "1",
		answer4: "A challenge.",
		answer4Total: "1",
		answer5: "A lifelong companion.",
		answer5Total: "1"
	},
	{
		question: "How much space do you have to accommodate the pet?",
		answer1: "The whole house and yard.",
		answer1Total: "1",
		answer2: "Part or all of a room.",
		answer2Total: "4",
		answer3: "A place for a very large cage.",
		answer3Total: "4",
		answer4: "A few rooms.",
		answer4Total: "3",
		answer5: "A desktop for a small wire cage.",
		answer5Total: "4"
	}
];

let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions = questions.length;

const container = document.querySelector(".quiz-container");
const questionEl = document.querySelector(".question");
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");
const option5 = document.querySelector(".option5");
const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".previous");
const restartButton = document.querySelector(".restart");
const result = document.querySelector(".result");

//Function to generate question
function generateQuestions(index) {
	//Select each question by passing it a particular index
	const question = questions[index];
	const option1Total = questions[index].answer1Total;
	const option2Total = questions[index].answer2Total;
	const option3Total = questions[index].answer3Total;
	const option4Total = questions[index].answer4Total;
	const option5Total = questions[index].answer5Total;

	//Populate html elements
	questionEl.innerHTML = `${index + 1}. ${question.question}`;
	option1.setAttribute("data-total", `${option1Total}`);
	option2.setAttribute("data-total", `${option2Total}`);
	option3.setAttribute("data-total", `${option3Total}`);
	option4.setAttribute("data-total", `${option4Total}`);
	option5.setAttribute("data-total", `${option5Total}`);
	option1.innerHTML = `${question.answer1}`;
	option2.innerHTML = `${question.answer2}`;
	option3.innerHTML = `${question.answer3}`;
	option4.innerHTML = `${question.answer4}`;
	option5.innerHTML = `${question.answer5}`;
}

function loadNextQuestion() {
	const selectedOption = document.querySelector('input[type="radio"]:checked');
	//Check if there is a radio input checked
	if (!selectedOption) {
		alert("Please select your answer!");
		return;
	}
	//Get value of selected radio
	const answerScore = Number(
		selectedOption.nextElementSibling.getAttribute("data-total")
	);
	

	////Add the answer score to the score array
	score.push(answerScore);

	selectedAnswersData.push();

	const totalScore = score.reduce((total, currentNum) => total + currentNum);

	//incement the current question number
	currentQuestion++;

	//once finished clear checked
	selectedOption.checked = false;

	//If quiz is on the final question
	if (currentQuestion == totalQuestions - 1) {
		nextButton.textContent = "Results";
	}
	//hide the questions container and show the results if the quiz iis finished
	if (currentQuestion == totalQuestions) {
		container.style.display = "none";
		if (totalScore <= 8) {
			result.innerHTML = `
            <div class="summary">
			<h1>You should get a DOG</h1>
			<img class="petImg" src ="images/dog.jpg">
			<p> If you're looking for a fun, longlife companion pet, make a dog your new BFF. Dogs provide us with unconditional love and companionship. They're always there when we're sick, and they know when we need some extra attention. Below are some of the great dog breeds for first-time owners.</p>
			<h2>Cavalier King Charles Spaniel </h2>
			<p>These breeds are gentle and affectionate and are known for being adaptable and good with all sorts of people, from young children to the elderly. The Cavalier is very trainable and open with strangers. While they do need regular grooming and an average amount of exercise, they are overall a low-maintenance breed.</p>
			<h2>Boxer</h2>
			<p>While they are instinctive guardians, the Boxer loves to be with his people. One of the breed's most notable characteristics is its desire for human affection, especially from children. They are patient and spirited with children, but also protective, makimg them a popular choice for families. The Boxer requires little grooming, but needs daily exercise.</p>
			<h2>Poodle</h2>
			<p>The Poodle is an exceptionally smart breed that excels in all kinds of dog sport activities. The dog comes in three size varieties, which may contribute to why Poodle is one of the most popular breeds. The Poodle can accommodate any size living quarters. Their hypoallergenic coat may reduce allergic reactions, but requires grooming knowledge to keep maintained.</p>
		</div>
        <button class="restart">Restart Quiz</button>
         `;
		}
		else if (totalScore <= 10) {
			result.innerHTML = `
            <div class="summary">
			<h1>You should get a CAT</h1>
			<img class="petImg" src ="images/cat.jpg">
			<p>If you're looking for a fun, smart and affectionate pet, make a cat your new BFF. Below are some of the best choices for someone looking to get their first cat.</p>
			<h2>Maine Coon</h2>
			<p>One of the largest of all the cat breeds, the Maine Coon is affectionate but not overly dependant. They enjoy following you around the house and get along with children and other pets. This breed has long hair that requires regular grooming. </p>
			<h2>Ragdoll </h2>
			<p>Ragdolls are cuddly and affectionate cats that enjoy being around their people. Though they are quiet and docile, they also enjoy playtime. These breeds are polite and generally kid-friendly. Their long hair needs regular combing.</p>
			<h2>Scottish Fold</h2>
			<p>This smart kitty has a quirky personality and adorable folded ears. Scottish Fold cats are curious, outgoing, and enjoy following you around the house. Long-haired Folds should be combed weekly.</p>
			</div>
        <button class="restart">Restart Quiz</button>
         `;
		}
		else if (totalScore <= 22) {
			result.innerHTML = `
            <div class="summary">
			<h1>You should get a RABBIT</h1>
			<img class="petImg" src ="images/rabbit.jpg">
			<p>If you're looking for an entartaining, small, wonderful companion, then getting a rabbit is a great choice. Below are some of the best breeds of rabbits for first-time owners. </p>
			<h2>New Zealand Rabbit</h2>
			<p>These breeds a perfect choicee if you are looking for the best breed of rabbits for first time owners. They are calm, docile and easy to bond with. New Zealand rabbits can be taught to play and do tricks as well. They are easy to take care of, They do not need bathing, these rabbits are impeccable groomers and can keep themselves clean. They only need brushing to help with any fur shedding.</p>
			<h2> Holland Lop</h2>
			<p> Holland Lop is one of the most popular rabbit breeds for first time owners. They are adorable ans have distinctive droppy ears. Although they come in on the smaller side of rabbit sizes, Holland Lops are friendly, energetic and smart. They are incredibly curious and love to explore their environment and figure out things on their own. They do not need any specific care but require weekly brushing and grooming to help with their shedding fur.</p> 
			<h2>Netherland Dwarf</h2>
			<p>These rabbits seem like they have been shrunk down which makes them look really adorable.  Most Netherland Dwarfs are friendly and playful but they can get spooked very easily and don’t really do well with to much handling. That being said, they can bond with humans as well as other pet animals and can be extremely affectionate. They are small rabbits that do not require much in the way of special care other than keeping their small size and fragile body in mind.</p>
			</div>
        <button class="restart">Restart Quiz</button>
         `;
		}
		else if (totalScore <= 16) {
			result.innerHTML = `
            <div class="summary">
			<h1>You should get a BIRD</h1>
			<img class="petImg" src ="images/bird.jpg">
			<p>If you are looking for an intelligent, easy to train, and social pet, make a bird your new BFF. Below are some of the best types of birds for first-time owners.</p>
			<h2>Budgie</h2>
			<p>Budgies are well known to be exceptionally warm, friendly and gentle when properly cared for and trained. These birds are among the smallest of bird species generally kept as pets, and are relatively easy to care for, and if you get a young one they can also be easy to train. These beautiful feathered friends make affordable pets that are both playful and active. Their tricks may include learning to talk and providing hours of amusement.</p>
			<h2>Cockatiel</h2>
			<p>These smart little parrots crave social interaction, and require an owner who can provide them with the time and attention they need in order to thrive and prevent loneliness or depression. Female cockatiels are as gentle as they come, and males are particularly good at mimicking sounds around them including phones, alarms and even outdoor birds. They need a huge cage with several toys and perches to keep them stimulated.</p>
			<h2>Canary</h2>
			<p>These lovely birds can be yellow or green, bright orange or brown. Known for their vibrant colour and ability to carry a tune, canaries are ideal if you're a beginner who isn't sure if they want a bird who requires a lot of attention. Though somewhat why and timid, canaries will need space to fly in order to stay happy and healthy, so you'll need a large flight space. Male canaries sing, while females do not.</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
		}
		else if (totalScore >= 20) {
			result.innerHTML = `
            <div class="summary">
			<h1>You should get a GUINEA PIG</h1>
			<img class="petImg" src ="images/guinea.jpg">
			<p>There are many different guinea pig breeds, each of which has unique physical and personality characteristics. Below are some of the best guinea pig breeds for first-time owners. </p>
			<h2>American/English guinea pig</h2>
			<p>American/English guinea pigs are known for their laid-back, easygoing personalities. Individual variation always exists, but this species does not tend to be as high-strung as some other breeds, especially if socialised appropiately from a young age. If you are looking for a guinea pig that you can cuddle and handle regularly, the American/English guinea pig may be a great option.</p>
			<h2>Abyssinian guinea pig</h2>
			<p>These guinea pigs have a distinct appearance, due to the presence of the rosettes in their fur. They are considered as high-energy breeds. If you're looking for a guinea pig who will thrive witch regular attention and training, an Abyssinian may be a great choice.</p>
			<h2>Teddy guinea pig</h2>
			<p> Teddy guinea pigs are known for being calm and friendly. Many Teddy guinea pigs are very tolerant of handling and may even enjoy cuddling with their owners. This makes them a good option for childern or first-time guinea pig owners. Their short coat requires minimal grooming, making them a relatively low-maintencance guinea pig breed. Their skin is prone to dryness, so frequent bathing is a problem for this breed.</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
		}
		else if (totalScore <= 20) {
			result.innerHTML = `
            <div class="summary">
            <h1>You should get a HAMSTER</h1>
			<img class="petImg" src ="images/hamster.jpg">
			<p>If you're looking for a cute and small pet, getting a hamster is a great choice. Below are some of the best hamsters for first-time owners.</p>
			<h2>Syrian Hamster</h2>
			<p>The Syrian hamster is also known as the golden hamster, and it is one of the most poular hamsters that people keep as pets. They make very good pets for beginners since they are easy to tame, fun to play with, and very low-maintenance. If you are looking for a hamster to bond with, you will have to look for some other type of hamster, because Syrian hamsters never really bond with their owners. Some might come closer when they see you and sleep on your hands.</p>
			<h2>Dwarf Hamster</h2>
			<p>Dwarf hamsters are very social and are happiest when they are in groups. They won't bond with you, but will recognise you and come close to the side of thier cage if they see you. This type of hamsters usually likes being help by people, however, if they feel uncomfortable, they will bite you. You should start handling them whey they are young and always be careful and gentle.</p>
			<h2>Robovski Hamster</h2>
			<p>Robovski hamsters are the smallest and fastest hamsters.  They love being active so make sure they have a lot of toys and an exercise wheel. Robovski hamsters are active during the night and sleep during the day. They are gentle are rarely bite. However, they are extremely fast which makes it hard to handle them. You can train them to take treats from your hand.</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
		}
		return;
	}
	generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
	//Decrement quentions index
	currentQuestion--;
	//remove last array value;
	score.pop();
	//Generate the question
	generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
	if (e.target.matches("button")) {
		//reset array index and score
		currentQuestion = 0;
		score = [];
		//Reload quiz to the start
		location.reload();
	}
}

generateQuestions(currentQuestion);
nextButton.addEventListener("click", loadNextQuestion);
previousButton.addEventListener("click", loadPreviousQuestion);
result.addEventListener("click", restartQuiz);
