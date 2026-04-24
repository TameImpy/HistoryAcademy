import type { Course, ReadingListItem } from "@history-academy/shared";

export const SEED_COURSES: Course[] = [
  {
    id: "course_1",
    slug: "tudor-dynasty",
    title: "The Tudor Dynasty",
    summary:
      "From Henry VII's victory at Bosworth to Elizabeth I's Golden Age, explore the dynasty that transformed England's religion, politics, and global ambitions.",
    instructor: "Dr. Suzannah Lipscomb",
    level: "beginner",
    durationHours: 6,
    heroImageUrl: "/images/courses/tudor-dynasty.jpg",
    status: "published",
    modules: [
      {
        id: "mod_1_1",
        order: 1,
        title: "The Rise of the Tudors",
        summary: "How an unlikely Welsh dynasty seized the English throne",
        lessons: [
          {
            id: "les_1_1_1",
            order: 1,
            title: "Bosworth Field: The Battle That Changed England",
            contentType: "video",
            muxAssetId: "mux_placeholder_1",
            transcript:
              "The Battle of Bosworth Field on 22 August 1485 was one of the most decisive encounters in English history. Henry Tudor, a relatively obscure claimant to the throne with a tenuous bloodline connection through his mother Margaret Beaufort, faced the reigning King Richard III. Richard had seized the crown just two years earlier after the mysterious disappearance of the Princes in the Tower. The battle itself was relatively brief but extraordinarily consequential. Richard's forces outnumbered Henry's, but the crucial intervention of the Stanley family — who had been hedging their bets — turned the tide. When Sir William Stanley committed his troops to Henry's side, Richard's position became untenable. The king himself led a desperate cavalry charge directly at Henry's position, coming close enough to cut down his standard-bearer, but was unhorsed and killed. According to tradition, the crown was found in a hawthorn bush and placed on Henry's head on the battlefield itself. This dramatic moment marked the end of the Plantagenet dynasty that had ruled England since 1154 and the beginning of Tudor rule. Henry VII would spend the next two decades consolidating his position, marrying Elizabeth of York to unite the warring houses, and establishing the financial and administrative foundations upon which his more famous son and granddaughter would build.",
            durationMinutes: 22,
          },
          {
            id: "les_1_1_2",
            order: 2,
            title: "Henry VII: The Unlikely King",
            contentType: "audio",
            muxAssetId: "mux_placeholder_2",
            transcript:
              "Henry VII is often overlooked in popular accounts of Tudor history, overshadowed by his flamboyant son Henry VIII and his granddaughter Elizabeth I. Yet without Henry VII's political acumen and financial prudence, the Tudor dynasty would never have survived its first generation. Born in Pembroke Castle in 1457, Henry Tudor spent much of his early life in exile in Brittany and France. His claim to the throne was through his mother, Margaret Beaufort, who descended from John of Gaunt through a line that had been explicitly barred from the succession. This legal weakness made Henry's hold on power perpetually insecure. He faced multiple pretenders, most notably Lambert Simnel and Perkin Warbeck, and dealt with each through a combination of military force, diplomatic cunning, and strategic marriages. Henry's approach to kingship was fundamentally different from his predecessors. Rather than relying on warfare and chivalric display, he governed through careful financial management and bureaucratic control. He personally audited the royal accounts, built up enormous cash reserves, and used bonds and recognisances to keep his nobility in check. By the time of his death in 1509, he had transformed the English monarchy from a near-bankrupt institution into the wealthiest crown in Europe.",
            durationMinutes: 25,
          },
          {
            id: "les_1_1_3",
            order: 3,
            title: "The Wars of the Roses: Context and Causes",
            contentType: "text",
            transcript:
              "The Wars of the Roses, the series of dynastic civil wars fought between 1455 and 1487, provide the essential backdrop to understanding the Tudor rise to power. The conflict between the houses of Lancaster and York arose from the weak kingship of Henry VI, whose mental incapacity created a power vacuum that ambitious nobles rushed to fill. Richard, Duke of York, initially sought only to act as protector during Henry's periods of incapacity, but the enmity of Margaret of Anjou, Henry's formidable queen, pushed the conflict toward open warfare. The battles that followed — St Albans, Wakefield, Towton, Barnet, Tewkesbury — devastated the English nobility and created a climate of political instability that would persist for decades. The Yorkist victory seemed complete when Edward IV seized the throne in 1461, but his sudden death in 1483 and the usurpation of Richard III reopened the wounds. It was into this chaotic landscape that Henry Tudor stepped, presenting himself not as a Lancastrian partisan but as a unifying figure who could end the bloodshed. His marriage to Elizabeth of York after Bosworth was a deliberate act of reconciliation, symbolised by the Tudor rose which combined the red rose of Lancaster with the white rose of York.",
            durationMinutes: 18,
          },
        ],
        quiz: {
          id: "quiz_1_1",
          questions: [
            {
              id: "q_1_1_1",
              text: "In what year was the Battle of Bosworth Field?",
              type: "mcq",
              options: ["1483", "1485", "1487", "1489"],
              correctIndex: 1,
            },
            {
              id: "q_1_1_2",
              text: "Which family's intervention proved decisive at Bosworth?",
              type: "mcq",
              options: ["The Nevilles", "The Stanleys", "The Percys", "The Howards"],
              correctIndex: 1,
            },
            {
              id: "q_1_1_3",
              text: "Explain how Henry VII used financial management to consolidate Tudor power.",
              type: "short-answer",
              modelAnswer:
                "Henry VII personally audited royal accounts, built cash reserves, and used bonds and recognisances to keep the nobility financially dependent on the crown. This transformed the monarchy from near-bankruptcy to the wealthiest in Europe.",
            },
          ],
        },
      },
      {
        id: "mod_1_2",
        order: 2,
        title: "Henry VIII and the Break with Rome",
        summary: "The king who reshaped England's religious and political landscape",
        lessons: [
          {
            id: "les_1_2_1",
            order: 1,
            title: "The King's Great Matter: Divorce and Reformation",
            contentType: "video",
            muxAssetId: "mux_placeholder_3",
            transcript:
              "Henry VIII's desire to annul his marriage to Catherine of Aragon triggered the most profound constitutional and religious revolution in English history. Catherine had failed to produce a male heir — her only surviving child was Princess Mary — and Henry became convinced that his marriage was cursed by God because Catherine had previously been married to his elder brother Arthur. When Pope Clement VII refused to grant an annulment, largely because Catherine's nephew Charles V had effectively imprisoned him, Henry took the radical step of declaring himself Supreme Head of the Church of England. The Act of Supremacy of 1534 severed England's ties with Rome and gave the crown control over religious affairs that the papacy had exercised for centuries. Thomas Cromwell, Henry's chief minister, orchestrated this revolution with remarkable administrative efficiency, dissolving the monasteries, redistributing their wealth, and creating a new religious settlement. The human cost was enormous: Sir Thomas More and Bishop John Fisher were executed for refusing to accept the king's supremacy, and the Pilgrimage of Grace of 1536 saw thousands of northerners rise in revolt against the religious changes.",
            durationMinutes: 28,
          },
          {
            id: "les_1_2_2",
            order: 2,
            title: "The Six Wives: Politics and Dynasty",
            contentType: "audio",
            muxAssetId: "mux_placeholder_4",
            transcript:
              "The six marriages of Henry VIII were not merely personal dramas but political events of the highest importance. Each marriage reflected Henry's desperate quest for a male heir and the shifting alliances of European diplomacy. Catherine of Aragon represented the Spanish alliance; Anne Boleyn brought the reformist faction to power; Jane Seymour finally produced the longed-for son, Edward; Anne of Cleves was a failed attempt at a Protestant alliance with the German princes; Catherine Howard represented the conservative Howard faction; and Catherine Parr brought stability and intellectual companionship to the ageing king. Understanding these marriages as political acts rather than romantic episodes reveals the extraordinary pressures of Tudor dynastic politics. Without a secure male succession, England faced the prospect of renewed civil war — a fear that haunted Henry throughout his reign.",
            durationMinutes: 24,
          },
          {
            id: "les_1_2_3",
            order: 3,
            title: "The Dissolution of the Monasteries",
            contentType: "video",
            muxAssetId: "mux_placeholder_5",
            transcript:
              "Between 1536 and 1541, Henry VIII and Thomas Cromwell carried out the dissolution of England's monasteries, priories, convents, and friaries. This was the largest redistribution of land and wealth since the Norman Conquest. Over 800 religious houses were closed, their assets seized by the crown, and their lands sold or granted to loyal supporters. The dissolution had profound consequences for English society. Monasteries had served as centres of learning, charity, and healthcare; their closure left gaps in social provision that would not be fully addressed for centuries. The redistribution of monastic lands created a new class of Protestant landowners whose wealth depended on the permanence of the Reformation — ensuring that any return to Catholicism would face powerful economic opposition. Architecturally, the dissolution left its mark across the English landscape in the form of ruined abbeys and priories, many of which remain hauntingly beautiful landmarks today.",
            durationMinutes: 20,
          },
        ],
        quiz: {
          id: "quiz_1_2",
          questions: [
            {
              id: "q_1_2_1",
              text: "What was the Act of Supremacy (1534)?",
              type: "mcq",
              options: [
                "A law banning Catholic worship",
                "A declaration making the monarch head of the Church of England",
                "A treaty with France",
                "A law establishing Parliament's authority",
              ],
              correctIndex: 1,
            },
            {
              id: "q_1_2_2",
              text: "Which wife of Henry VIII gave birth to his male heir?",
              type: "mcq",
              options: ["Anne Boleyn", "Catherine of Aragon", "Jane Seymour", "Catherine Parr"],
              correctIndex: 2,
            },
            {
              id: "q_1_2_3",
              text: "Who was the chief minister who orchestrated the dissolution of the monasteries?",
              type: "mcq",
              options: ["Thomas More", "Thomas Wolsey", "Thomas Cromwell", "Thomas Cranmer"],
              correctIndex: 2,
            },
            {
              id: "q_1_2_4",
              text: "Explain the long-term significance of the dissolution of the monasteries for English society.",
              type: "short-answer",
              modelAnswer:
                "The dissolution redistributed monastic wealth to Protestant landowners, creating an economic constituency opposed to any return to Catholicism. It also removed the social safety net monasteries provided (healthcare, education, poor relief), leaving gaps in social provision for centuries.",
            },
          ],
        },
      },
      {
        id: "mod_1_3",
        order: 3,
        title: "Elizabeth I and the Golden Age",
        summary: "The Virgin Queen who made England a global power",
        lessons: [
          {
            id: "les_1_3_1",
            order: 1,
            title: "The Elizabethan Religious Settlement",
            contentType: "video",
            muxAssetId: "mux_placeholder_6",
            transcript:
              "When Elizabeth I ascended to the throne in 1558, she inherited a kingdom torn apart by religious conflict. Her father had broken with Rome, her brother Edward VI had imposed radical Protestantism, and her sister Mary I had brutally reimposed Catholicism. Elizabeth's genius lay in crafting a religious settlement that was deliberately ambiguous — Protestant in doctrine but retaining enough Catholic ceremony and structure to be acceptable to the majority of her subjects. The Elizabethan Settlement, established by the Acts of Supremacy and Uniformity in 1559, created the Church of England as a via media or middle way between Catholicism and Protestantism. Elizabeth declared herself Supreme Governor (rather than Supreme Head) of the Church, a subtle distinction that avoided some of the theological objections. The Book of Common Prayer was revised to allow multiple interpretations of key doctrines. This settlement was not universally popular — Catholics viewed it as heresy, while Puritans considered it an incomplete reformation — but it proved remarkably durable.",
            durationMinutes: 26,
          },
          {
            id: "les_1_3_2",
            order: 2,
            title: "The Spanish Armada and Protestant England",
            contentType: "audio",
            muxAssetId: "mux_placeholder_7",
            transcript:
              "The defeat of the Spanish Armada in 1588 was the defining moment of Elizabeth's reign and one of the most celebrated events in English history. Philip II of Spain, the most powerful monarch in Europe, assembled a vast fleet to invade England, overthrow the Protestant queen, and restore Catholicism. The Armada of 130 ships carried 18,000 soldiers and was to rendezvous with the Duke of Parma's army in the Netherlands for a cross-Channel invasion. The English response combined naval skill with extraordinary good fortune. Sir Francis Drake and Lord Howard of Effingham used faster, more manoeuvrable ships to harass the Armada as it sailed up the Channel. Fire ships scattered the Spanish fleet at Calais, and a combination of English gunnery and fierce storms drove the remnants around Scotland and Ireland, where many ships were wrecked. Elizabeth's speech at Tilbury — 'I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king' — became one of the most famous pieces of English oratory.",
            durationMinutes: 22,
          },
          {
            id: "les_1_3_3",
            order: 3,
            title: "Shakespeare and the Elizabethan Renaissance",
            contentType: "text",
            transcript:
              "The Elizabethan era produced one of the greatest flowerings of literary and artistic achievement in English history. William Shakespeare, Christopher Marlowe, Edmund Spenser, and Ben Jonson transformed English literature, while composers like William Byrd and Thomas Tallis created masterpieces of church and secular music. The theatre became a central feature of London life, with purpose-built playhouses like the Globe attracting audiences from every social class. Shakespeare's plays explored themes of power, identity, love, and mortality with a psychological depth that had no precedent in English literature. Elizabeth herself was a significant patron of the arts and a highly educated woman who spoke multiple languages and wrote poetry. Her court became a centre of cultural sophistication that rivalled any in Europe. The Elizabethan Renaissance was not merely a cultural phenomenon but a political one: the flourishing of English letters was intimately connected to the growth of national confidence and the assertion of English identity in opposition to Catholic Europe.",
            durationMinutes: 15,
          },
        ],
        quiz: {
          id: "quiz_1_3",
          questions: [
            {
              id: "q_1_3_1",
              text: "In what year was the Spanish Armada defeated?",
              type: "mcq",
              options: ["1585", "1587", "1588", "1590"],
              correctIndex: 2,
            },
            {
              id: "q_1_3_2",
              text: "What was Elizabeth's title in relation to the Church of England?",
              type: "mcq",
              options: ["Supreme Head", "Supreme Governor", "Defender of the Faith", "Archbishop"],
              correctIndex: 1,
            },
            {
              id: "q_1_3_3",
              text: "Describe the Elizabethan Religious Settlement and explain why it was described as a 'via media'.",
              type: "short-answer",
              modelAnswer:
                "The Elizabethan Settlement (1559) was deliberately ambiguous — Protestant in doctrine but retaining Catholic ceremony. Elizabeth used the title Supreme Governor rather than Supreme Head, and the Book of Common Prayer allowed multiple interpretations. It was a 'via media' (middle way) between Catholicism and radical Protestantism.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "course_2",
    slug: "roman-britain",
    title: "Roman Britain",
    summary:
      "Four centuries of Roman rule that transformed the British Isles, from Claudius's invasion to the fall of the last legions.",
    instructor: "Prof. Mary Beard",
    level: "intermediate",
    durationHours: 8,
    heroImageUrl: "/images/courses/roman-britain.jpg",
    status: "published",
    modules: [
      {
        id: "mod_2_1",
        order: 1,
        title: "Invasion and Conquest",
        summary: "From Caesar's raids to Claudius's conquest",
        lessons: [
          {
            id: "les_2_1_1",
            order: 1,
            title: "Caesar's Expeditions: 55 and 54 BC",
            contentType: "video",
            muxAssetId: "mux_placeholder_8",
            transcript:
              "Julius Caesar's two expeditions to Britain in 55 and 54 BC were not full-scale invasions but reconnaissance in force. The first expedition was a near-disaster: Caesar's cavalry transports were scattered by storms, and the legions struggled to land on the beaches near Deal in Kent. The second expedition was more substantial, with five legions and 2,000 cavalry crossing the Channel. Caesar advanced inland, crossed the Thames, and defeated the British war leader Cassivellaunus, but he withdrew without establishing permanent occupation. These expeditions were primarily political — designed to enhance Caesar's reputation in Rome — but they established the idea of Britain as a place that might be conquered and brought within the Roman sphere.",
            durationMinutes: 20,
          },
          {
            id: "les_2_1_2",
            order: 2,
            title: "The Claudian Invasion of AD 43",
            contentType: "video",
            muxAssetId: "mux_placeholder_9",
            transcript:
              "The Emperor Claudius's invasion of Britain in AD 43 was a far more serious undertaking than Caesar's expeditions. Four legions — approximately 20,000 men — under the command of Aulus Plautius crossed the Channel and established a bridgehead in Kent. The invasion was partly motivated by Claudius's need for military prestige to shore up his position as emperor, and partly by the strategic and economic opportunities Britain offered. The Romans quickly subdued the southeast, with Claudius himself arriving to lead the triumphal entry into Camulodunum (Colchester), which became the first Roman capital of Britain. The conquest proceeded rapidly in the lowlands but faced fierce resistance in the highlands of Wales and northern England.",
            durationMinutes: 25,
          },
          {
            id: "les_2_1_3",
            order: 3,
            title: "Boudica's Revolt",
            contentType: "audio",
            muxAssetId: "mux_placeholder_10",
            transcript:
              "The revolt of Boudica in AD 60-61 was the most serious challenge to Roman rule in Britain. Boudica, queen of the Iceni tribe in what is now Norfolk, led a massive uprising after Roman officials seized her husband's kingdom, had her flogged, and assaulted her daughters. The rebels destroyed Camulodunum, Londinium, and Verulamium, killing an estimated 70,000 to 80,000 people. The Governor Suetonius Paulinus, who had been campaigning in Wales, marched back to face Boudica and defeated her forces in a pitched battle, probably somewhere in the Midlands. The revolt demonstrated both the fragility of Roman control and the brutal effectiveness of Roman military response. After Boudica's defeat, Roman policy shifted toward more conciliatory governance.",
            durationMinutes: 22,
          },
        ],
        quiz: {
          id: "quiz_2_1",
          questions: [
            {
              id: "q_2_1_1",
              text: "In what year did the main Roman invasion of Britain take place?",
              type: "mcq",
              options: ["55 BC", "AD 43", "AD 60", "AD 122"],
              correctIndex: 1,
            },
            {
              id: "q_2_1_2",
              text: "Which tribe did Boudica lead?",
              type: "mcq",
              options: ["The Brigantes", "The Iceni", "The Catuvellauni", "The Trinovantes"],
              correctIndex: 1,
            },
            {
              id: "q_2_1_3",
              text: "Why did Emperor Claudius choose to invade Britain?",
              type: "short-answer",
              modelAnswer:
                "Claudius needed military prestige to consolidate his position as emperor (he had been unexpectedly elevated by the Praetorian Guard). Britain also offered strategic and economic opportunities including tin, lead, and grain.",
            },
          ],
        },
      },
      {
        id: "mod_2_2",
        order: 2,
        title: "Roman Life in Britain",
        summary: "Towns, villas, roads, and daily life under Roman rule",
        lessons: [
          {
            id: "les_2_2_1",
            order: 1,
            title: "Roman Towns: Bath, London, and York",
            contentType: "video",
            muxAssetId: "mux_placeholder_11",
            transcript:
              "The Romans transformed Britain's landscape with an extensive network of towns, roads, and settlements. Londinium grew from a small trading post to a major administrative centre with a population of perhaps 30,000 — enormous by ancient British standards. Aquae Sulis (Bath) became famous for its thermal springs and magnificent bathing complex. Eboracum (York) served as the military headquarters for the northern frontier. These towns featured forums, basilicas, temples, amphitheatres, and public bathhouses that brought Mediterranean urban culture to a previously rural society.",
            durationMinutes: 24,
          },
          {
            id: "les_2_2_2",
            order: 2,
            title: "Hadrian's Wall: Frontier of Empire",
            contentType: "audio",
            muxAssetId: "mux_placeholder_12",
            transcript:
              "Hadrian's Wall, built from AD 122 onwards, stretched 73 miles from Wallsend on the River Tyne to Bowness-on-Solway. It was the most ambitious construction project in Roman Britain and one of the most impressive frontier works in the entire Roman Empire. The Wall was not simply a military barrier but a complex system of forts, milecastles, turrets, and a military road that served as a customs barrier, observation line, and statement of imperial power. The garrison consisted of auxiliary troops from across the empire — evidence shows soldiers from Syria, North Africa, and the Danube region stationed along its length.",
            durationMinutes: 20,
          },
          {
            id: "les_2_2_3",
            order: 3,
            title: "The Vindolanda Tablets: Voices from the Frontier",
            contentType: "text",
            transcript:
              "The Vindolanda writing tablets, discovered at the fort of Vindolanda near Hadrian's Wall, are among the most extraordinary archaeological finds in Britain. Dating from around AD 85-130, these thin wooden tablets preserve personal letters, military reports, and administrative documents that give an unparalleled glimpse into daily life on the Roman frontier. They include a birthday party invitation from Claudia Severa to Sulpicia Lepidina, requests for supplies of beer and socks, and military strength reports. These documents reveal a frontier community that was far more cosmopolitan and literate than previously imagined.",
            durationMinutes: 16,
          },
        ],
        quiz: {
          id: "quiz_2_2",
          questions: [
            {
              id: "q_2_2_1",
              text: "When was Hadrian's Wall built?",
              type: "mcq",
              options: ["AD 43", "AD 80", "AD 122", "AD 200"],
              correctIndex: 2,
            },
            {
              id: "q_2_2_2",
              text: "What were the Vindolanda tablets?",
              type: "short-answer",
              modelAnswer:
                "Thin wooden tablets found at Vindolanda fort near Hadrian's Wall, dating to AD 85-130. They contain personal letters, military reports, and administrative records that reveal daily life on the Roman frontier, including a birthday invitation and requests for beer and socks.",
            },
            {
              id: "q_2_2_3",
              text: "What was the Roman name for Bath?",
              type: "mcq",
              options: ["Londinium", "Aquae Sulis", "Eboracum", "Camulodunum"],
              correctIndex: 1,
            },
          ],
        },
      },
    ],
  },
  {
    id: "course_3",
    slug: "wwii-home-front",
    title: "The Home Front: Britain in WWII",
    summary:
      "How ordinary Britons lived through the Blitz, rationing, and evacuation — and how the war transformed British society forever.",
    instructor: "Prof. Richard Overy",
    level: "beginner",
    durationHours: 7,
    heroImageUrl: "/images/courses/wwii-home-front.jpg",
    status: "published",
    modules: [
      {
        id: "mod_3_1",
        order: 1,
        title: "Britain Goes to War",
        summary: "From appeasement to the Blitz",
        lessons: [
          {
            id: "les_3_1_1",
            order: 1,
            title: "The Road to War: Appeasement and Its Failure",
            contentType: "video",
            muxAssetId: "mux_placeholder_13",
            transcript:
              "Neville Chamberlain's policy of appeasement, which culminated in the Munich Agreement of September 1938, has become one of the most debated decisions in British political history. Chamberlain genuinely believed that reasonable concessions to Hitler could prevent another catastrophic war — a view widely shared by a British public that remembered the horrors of 1914-18. The Munich Agreement, which allowed Germany to annex the Sudetenland region of Czechoslovakia, was initially greeted with enormous relief. Chamberlain's declaration of 'peace for our time' reflected the profound desire of ordinary Britons to avoid a repetition of the trenches. When Hitler invaded the rest of Czechoslovakia in March 1939 and then Poland in September, the failure of appeasement became undeniable. Britain declared war on 3 September 1939, beginning a conflict that would test the nation's resilience as never before.",
            durationMinutes: 24,
          },
          {
            id: "les_3_1_2",
            order: 2,
            title: "The Blitz: London Under Fire",
            contentType: "video",
            muxAssetId: "mux_placeholder_14",
            transcript:
              "The Blitz, the sustained German bombing campaign against British cities from September 1940 to May 1941, killed over 43,000 civilians and destroyed or damaged more than a million homes. London bore the brunt of the assault, enduring 57 consecutive nights of bombing from 7 September 1940. The East End, with its docks and industrial areas, suffered disproportionately. Londoners sheltered in Underground stations, Anderson shelters in their gardens, and Morrison shelters under their kitchen tables. The famous 'Blitz spirit' — the stoic determination to carry on despite the bombing — has become central to British national identity, though historians have noted that morale was more fragile than the myth suggests. Looting, panic, and resentment at class inequalities in shelter provision were real features of the experience.",
            durationMinutes: 28,
          },
          {
            id: "les_3_1_3",
            order: 3,
            title: "Evacuation: Children at War",
            contentType: "audio",
            muxAssetId: "mux_placeholder_15",
            transcript:
              "The evacuation of children from Britain's cities was one of the most remarkable social experiments of the twentieth century. Operation Pied Piper, launched on 1 September 1939 — two days before war was declared — saw 1.5 million children, pregnant women, and mothers with young children transported from urban areas to the countryside. The experience was deeply mixed: some evacuees found loving homes and opportunities they had never known, while others faced neglect, exploitation, or abuse. The evacuation also exposed the stark reality of urban poverty to middle-class rural families who were shocked by the condition of some inner-city children — malnourished, infested with lice, and lacking basic possessions. This social revelation contributed to the post-war consensus that produced the welfare state.",
            durationMinutes: 22,
          },
        ],
        quiz: {
          id: "quiz_3_1",
          questions: [
            {
              id: "q_3_1_1",
              text: "When did Britain declare war on Germany?",
              type: "mcq",
              options: ["1 September 1939", "3 September 1939", "10 May 1940", "7 December 1941"],
              correctIndex: 1,
            },
            {
              id: "q_3_1_2",
              text: "How many consecutive nights was London bombed at the start of the Blitz?",
              type: "mcq",
              options: ["30", "45", "57", "76"],
              correctIndex: 2,
            },
            {
              id: "q_3_1_3",
              text: "What was Operation Pied Piper?",
              type: "short-answer",
              modelAnswer:
                "The mass evacuation of 1.5 million children, pregnant women, and mothers from British cities to the countryside, launched on 1 September 1939. It exposed class divisions and urban poverty to rural communities, contributing to post-war welfare state reforms.",
            },
          ],
        },
      },
      {
        id: "mod_3_2",
        order: 2,
        title: "Daily Life and the War Effort",
        summary: "Rationing, women's work, and the transformation of British society",
        lessons: [
          {
            id: "les_3_2_1",
            order: 1,
            title: "Rationing and the Kitchen Front",
            contentType: "video",
            muxAssetId: "mux_placeholder_16",
            transcript:
              "Food rationing, introduced in January 1940, fundamentally changed the way Britain ate. Every person received a ration book entitling them to fixed weekly quantities of basic foodstuffs: initially bacon, butter, and sugar, later extended to meat, tea, jam, cheese, eggs, and sweets. The Ministry of Food, under Lord Woolton, launched a massive public information campaign encouraging people to 'dig for victory' by growing their own vegetables. Allotments proliferated across the country, and even the moat at the Tower of London was planted with cabbages. Ironically, rationing actually improved the health of many working-class Britons, who had previously eaten poorly. The fair distribution of scarce resources was seen as a moral achievement and contributed to the egalitarian spirit that characterised wartime Britain.",
            durationMinutes: 22,
          },
          {
            id: "les_3_2_2",
            order: 2,
            title: "Women at War: Factory, Farm, and Forces",
            contentType: "audio",
            muxAssetId: "mux_placeholder_17",
            transcript:
              "The Second World War transformed the role of women in British society. With millions of men serving in the armed forces, women were called upon to fill their places in factories, farms, and essential services. The Women's Land Army recruited 80,000 women to work on farms. Women worked in munitions factories, drove ambulances, operated anti-aircraft batteries, and served in the auxiliary services — the WRNS (Navy), WAAF (Air Force), and ATS (Army). From December 1941, unmarried women aged 20-30 were conscripted for war work — the first time any nation had conscripted women. This experience of independence, earning power, and responsibility could not simply be reversed when the war ended, though the immediate post-war period saw considerable pressure on women to return to domestic roles.",
            durationMinutes: 20,
          },
          {
            id: "les_3_2_3",
            order: 3,
            title: "Victory and the Birth of the Welfare State",
            contentType: "video",
            muxAssetId: "mux_placeholder_18",
            transcript:
              "The end of the war in 1945 brought not celebration alone but a determination that the sacrifices of wartime should lead to a fairer society. The Beveridge Report of 1942, which proposed a comprehensive system of social insurance 'from the cradle to the grave', became a bestseller and captured the public imagination. In the general election of July 1945, the British public delivered a stunning verdict: despite Churchill's immense personal popularity as a war leader, they voted overwhelmingly for Clement Attlee's Labour Party, which promised to implement the Beveridge vision. The result was the creation of the National Health Service, the expansion of national insurance, and a massive programme of social housing. The welfare state was, in many ways, the most lasting legacy of the Home Front experience.",
            durationMinutes: 26,
          },
        ],
        quiz: {
          id: "quiz_3_2",
          questions: [
            {
              id: "q_3_2_1",
              text: "When was food rationing introduced in Britain?",
              type: "mcq",
              options: ["September 1939", "January 1940", "June 1940", "January 1941"],
              correctIndex: 1,
            },
            {
              id: "q_3_2_2",
              text: "What was the Beveridge Report?",
              type: "mcq",
              options: [
                "A military strategy document",
                "A report on wartime casualties",
                "A plan for comprehensive social insurance",
                "A rationing schedule",
              ],
              correctIndex: 2,
            },
            {
              id: "q_3_2_3",
              text: "Explain how the experience of the Home Front contributed to the creation of the welfare state.",
              type: "short-answer",
              modelAnswer:
                "Wartime rationing and shared sacrifice created an egalitarian spirit. Evacuation exposed class inequalities. The Beveridge Report captured public desire for social reform. In 1945, voters chose Labour over Churchill to build a fairer post-war society, leading to the NHS and expanded social insurance.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "course_4",
    slug: "medieval-england",
    title: "Medieval England: Life, Law, and Legacy",
    summary:
      "From the Norman Conquest to the Wars of the Roses, discover the world of peasants, kings, and cathedral builders.",
    instructor: "Dr. Eleanor Janega",
    level: "beginner",
    durationHours: 7,
    heroImageUrl: "/images/courses/medieval-england.jpg",
    status: "published",
    modules: [
      {
        id: "mod_4_1",
        order: 1,
        title: "The Norman Conquest and Its Aftermath",
        summary: "How 1066 reshaped English society",
        lessons: [
          {
            id: "les_4_1_1",
            order: 1,
            title: "The Battle of Hastings",
            contentType: "video",
            muxAssetId: "mux_placeholder_19",
            transcript:
              "The Battle of Hastings on 14 October 1066 was the most consequential single day in English history. William, Duke of Normandy, defeated and killed King Harold II in a battle that lasted from morning until dusk. Harold's army, exhausted from their forced march south after defeating a Norwegian invasion at Stamford Bridge just days earlier, held the ridge at Senlac Hill against repeated Norman cavalry charges. The battle was decided late in the day when Harold was killed — tradition says by an arrow in the eye, though this is debated. William's victory replaced the Anglo-Saxon ruling class with a Norman French aristocracy, transforming England's language, law, architecture, and relationship with continental Europe.",
            durationMinutes: 24,
          },
          {
            id: "les_4_1_2",
            order: 2,
            title: "The Domesday Book: England Surveyed",
            contentType: "audio",
            muxAssetId: "mux_placeholder_20",
            transcript:
              "In 1086, William the Conqueror commissioned the most comprehensive survey of land ownership ever attempted in medieval Europe. The Domesday Book recorded the resources of every manor in England: who held the land, how many ploughs, animals, and people it supported, and what it was worth. The survey's purpose was primarily fiscal — William needed to know exactly what taxes he could extract — but the result was an administrative achievement that had no parallel until modern census-taking. The name 'Domesday' (Day of Judgement) reflects the finality of its verdicts: there was no appeal against its findings. The two volumes that survive provide an invaluable snapshot of English society twenty years after the Conquest.",
            durationMinutes: 18,
          },
          {
            id: "les_4_1_3",
            order: 3,
            title: "Castle and Cathedral: Norman Architecture",
            contentType: "text",
            transcript:
              "The Normans transformed the English landscape with two types of monumental building: castles and cathedrals. Within twenty years of the Conquest, hundreds of castles had been built across England — initially simple motte-and-bailey structures of earth and timber, later replaced by massive stone keeps like the Tower of London and Rochester Castle. These castles served as instruments of control, housing Norman garrisons in a hostile country. Simultaneously, the Normans rebuilt nearly every major English church in the new Romanesque style, with massive round arches, thick walls, and imposing towers. Durham Cathedral, begun in 1093, is perhaps the finest example of Norman ecclesiastical architecture, its revolutionary ribbed vaulting anticipating the Gothic style that would dominate the following century.",
            durationMinutes: 16,
          },
        ],
        quiz: {
          id: "quiz_4_1",
          questions: [
            {
              id: "q_4_1_1",
              text: "In what year was the Battle of Hastings?",
              type: "mcq",
              options: ["1042", "1060", "1066", "1086"],
              correctIndex: 2,
            },
            {
              id: "q_4_1_2",
              text: "What was the primary purpose of the Domesday Book?",
              type: "mcq",
              options: [
                "Recording births and deaths",
                "Assessing taxable wealth",
                "Planning military campaigns",
                "Documenting church property",
              ],
              correctIndex: 1,
            },
            {
              id: "q_4_1_3",
              text: "How did the Norman Conquest change English architecture?",
              type: "short-answer",
              modelAnswer:
                "The Normans built hundreds of castles (initially motte-and-bailey, then stone keeps like the Tower of London) as instruments of control, and rebuilt major churches in the Romanesque style with massive arches and thick walls, exemplified by Durham Cathedral.",
            },
          ],
        },
      },
      {
        id: "mod_4_2",
        order: 2,
        title: "Medieval Society and Daily Life",
        summary: "Peasants, merchants, and the feudal order",
        lessons: [
          {
            id: "les_4_2_1",
            order: 1,
            title: "The Feudal System and Manorial Life",
            contentType: "video",
            muxAssetId: "mux_placeholder_21",
            transcript:
              "Medieval English society was organised around the manor, a self-sufficient agricultural unit typically comprising a village, its surrounding fields, meadows, and woodland. The lord of the manor held the land from the king in exchange for military service, and the peasants who worked the land owed labour services and rents to the lord. Most peasants were villeins — unfree tenants bound to the manor who could not leave without their lord's permission. They worked the lord's demesne (private land) for several days each week and cultivated their own strips in the open fields for the remainder. Life was dictated by the agricultural calendar: ploughing, sowing, haymaking, and harvest. The diet was monotonous — bread, pottage (vegetable stew), ale, and occasionally cheese or bacon — but it sustained a population that grew substantially between the eleventh and thirteenth centuries.",
            durationMinutes: 26,
          },
          {
            id: "les_4_2_2",
            order: 2,
            title: "The Black Death and Its Aftermath",
            contentType: "video",
            muxAssetId: "mux_placeholder_22",
            transcript:
              "The Black Death reached England in June 1348 and over the following eighteen months killed between a third and a half of the population — perhaps 2.5 million people out of a pre-plague population of 5-6 million. The disease, caused by the bacterium Yersinia pestis, was spread by fleas carried on black rats. It struck with terrifying speed: victims typically died within three to five days of the first symptoms. The demographic catastrophe transformed English society. With labour suddenly scarce, surviving peasants could demand higher wages and better conditions. The Statute of Labourers (1351) attempted to freeze wages at pre-plague levels, but enforcement proved impossible. The resulting tensions contributed to the Peasants' Revolt of 1381, when Wat Tyler led thousands of rebels to London demanding an end to serfdom and unjust taxation.",
            durationMinutes: 28,
          },
          {
            id: "les_4_2_3",
            order: 3,
            title: "Magna Carta and the Birth of Parliament",
            contentType: "audio",
            muxAssetId: "mux_placeholder_23",
            transcript:
              "Magna Carta, sealed by King John at Runnymede in June 1215, has become the foundational document of English constitutional liberty. In reality, it was a feudal document addressing the specific grievances of the barons against John's arbitrary and rapacious government. Its most famous clause — that no free man should be imprisoned or dispossessed except by the lawful judgement of his peers or the law of the land — applied to a tiny fraction of the population. Yet the principle it established, that even the king was subject to law, proved revolutionary. Over the following century, the need for kings to consult their subjects evolved into the institution of Parliament. Simon de Montfort's Parliament of 1265, which included representatives of towns and shires alongside the nobility, is often cited as the origin of the House of Commons.",
            durationMinutes: 22,
          },
        ],
        quiz: {
          id: "quiz_4_2",
          questions: [
            {
              id: "q_4_2_1",
              text: "When did the Black Death reach England?",
              type: "mcq",
              options: ["1338", "1345", "1348", "1355"],
              correctIndex: 2,
            },
            {
              id: "q_4_2_2",
              text: "What proportion of England's population died in the Black Death?",
              type: "mcq",
              options: [
                "About one in ten",
                "About one in four",
                "Between a third and a half",
                "About three quarters",
              ],
              correctIndex: 2,
            },
            {
              id: "q_4_2_3",
              text: "What was the key principle established by Magna Carta?",
              type: "short-answer",
              modelAnswer:
                "That even the king was subject to law — specifically that no free man should be imprisoned or dispossessed except by lawful judgement of peers or the law of the land. This feudal document evolved into a foundational constitutional principle.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "course_5",
    slug: "victorian-age",
    title: "The Victorian Age: Empire, Industry, and Reform",
    summary:
      "How Britain became the world's first industrial superpower and grappled with the social consequences of rapid change.",
    instructor: "Prof. Judith Flanders",
    level: "intermediate",
    durationHours: 8,
    heroImageUrl: "/images/courses/victorian-age.jpg",
    status: "published",
    modules: [
      {
        id: "mod_5_1",
        order: 1,
        title: "The Industrial Revolution",
        summary: "Steam, iron, and the transformation of Britain",
        lessons: [
          {
            id: "les_5_1_1",
            order: 1,
            title: "The Factory System and the New Industrial Landscape",
            contentType: "video",
            muxAssetId: "mux_placeholder_24",
            transcript:
              "The Industrial Revolution, which gathered pace from the late eighteenth century and reached its zenith during Victoria's reign, transformed Britain from a predominantly agricultural society into the world's first industrial nation. The factory system concentrated workers in purpose-built mills and workshops, replacing the domestic system of production that had characterised earlier centuries. Manchester, Birmingham, Leeds, and Sheffield grew from market towns into vast industrial cities, their skylines dominated by chimneys belching smoke. The human cost was enormous: factory workers, including children as young as five or six, worked twelve to sixteen-hour days in dangerous conditions. Yet the industrial revolution also created unprecedented wealth and eventually — after decades of reform — improved living standards for the majority of the population.",
            durationMinutes: 26,
          },
          {
            id: "les_5_1_2",
            order: 2,
            title: "Railways: Shrinking the Nation",
            contentType: "audio",
            muxAssetId: "mux_placeholder_25",
            transcript:
              "The railway revolution of the 1830s and 1840s was the most visible and transformative aspect of Victorian industrialisation. The opening of the Liverpool and Manchester Railway in 1830 — famously marked by the death of the MP William Huskisson, struck by Stephenson's Rocket — inaugurated a new era of transport. Within twenty years, over 6,000 miles of track had been laid across Britain in a frenzy of speculative investment known as Railway Mania. Railways shrank distances, standardised time (before railways, each town kept its own local time), created new patterns of commuting and leisure travel, and fundamentally altered the relationship between city and countryside. They also created enormous fortunes for investors and contractors, while displacing thousands of urban poor whose homes were demolished to make way for new lines and stations.",
            durationMinutes: 22,
          },
          {
            id: "les_5_1_3",
            order: 3,
            title: "The Great Exhibition of 1851",
            contentType: "text",
            transcript:
              "The Great Exhibition of 1851, held in Joseph Paxton's revolutionary Crystal Palace in Hyde Park, was a defining moment of the Victorian age. Prince Albert, its chief promoter, envisioned it as a celebration of industrial progress and international cooperation. Over six million visitors — equivalent to a third of Britain's population — came to marvel at over 100,000 exhibits from around the world. Britain's industrial supremacy was on full display: massive steam engines, precision instruments, and manufactured goods demonstrated the nation's technological leadership. The Crystal Palace itself, a vast structure of iron and glass covering 19 acres, was an engineering marvel that could be erected in just five months. The Exhibition made a substantial profit, which was used to establish the South Kensington museum complex, including what would become the Victoria and Albert Museum, the Science Museum, and the Natural History Museum.",
            durationMinutes: 18,
          },
        ],
        quiz: {
          id: "quiz_5_1",
          questions: [
            {
              id: "q_5_1_1",
              text: "When did the Liverpool and Manchester Railway open?",
              type: "mcq",
              options: ["1825", "1830", "1835", "1840"],
              correctIndex: 1,
            },
            {
              id: "q_5_1_2",
              text: "What was the Crystal Palace?",
              type: "mcq",
              options: [
                "Queen Victoria's residence",
                "A glass and iron exhibition hall in Hyde Park",
                "A railway station in London",
                "A museum in South Kensington",
              ],
              correctIndex: 1,
            },
            {
              id: "q_5_1_3",
              text: "How did railways transform Victorian Britain beyond transport?",
              type: "short-answer",
              modelAnswer:
                "Railways standardised time across Britain, created new patterns of commuting and leisure, altered urban-rural relationships, generated enormous wealth through speculative investment, and displaced urban communities. They fundamentally reshaped how Victorians experienced distance, time, and social mobility.",
            },
          ],
        },
      },
      {
        id: "mod_5_2",
        order: 2,
        title: "Social Reform and Empire",
        summary: "The struggle for justice at home and the expansion of power abroad",
        lessons: [
          {
            id: "les_5_2_1",
            order: 1,
            title: "Child Labour and the Factory Acts",
            contentType: "video",
            muxAssetId: "mux_placeholder_26",
            transcript:
              "The exploitation of child labour in Victorian factories and mines provoked some of the most important social legislation of the nineteenth century. Children as young as four worked in cotton mills, coal mines, and chimney sweeping. The Mines Act of 1842, prompted by a shocking parliamentary report that revealed girls and boys working underground in appalling conditions, banned children under ten from mines. The Factory Acts progressively restricted working hours for children and women, introduced compulsory schooling, and mandated safety inspections. These reforms were bitterly opposed by many industrialists who argued that regulation would destroy British competitiveness. The reformers — including Lord Shaftesbury, whose tireless campaigning earned him the title 'the poor man's earl' — prevailed through a combination of public outrage and parliamentary persistence.",
            durationMinutes: 24,
          },
          {
            id: "les_5_2_2",
            order: 2,
            title: "The British Empire at Its Height",
            contentType: "video",
            muxAssetId: "mux_placeholder_27",
            transcript:
              "By the end of Victoria's reign in 1901, the British Empire encompassed roughly a quarter of the world's land surface and a quarter of its population. India, the 'jewel in the crown', was administered by the Indian Civil Service — a tiny cadre of British officials ruling over 300 million people. The scramble for Africa in the 1880s and 1890s added vast new territories. The empire was sustained by the Royal Navy, the world's most powerful fleet, and justified by a mixture of commercial interest, strategic calculation, and a belief in Britain's civilising mission. The reality of imperial rule was far more complex and morally ambiguous than Victorian propaganda suggested: it involved exploitation, racial hierarchy, and periodic violence alongside infrastructure development, legal reform, and the suppression of practices like slavery and sati.",
            durationMinutes: 28,
          },
          {
            id: "les_5_2_3",
            order: 3,
            title: "The Suffrage Movement: Votes for Women",
            contentType: "audio",
            muxAssetId: "mux_placeholder_28",
            transcript:
              "The campaign for women's suffrage, which gathered momentum from the 1860s onwards, was one of the defining political struggles of the late Victorian and Edwardian periods. The suffragists, led by Millicent Fawcett's National Union of Women's Suffrage Societies, pursued constitutional methods: petitions, lobbying, and public meetings. The suffragettes, led by Emmeline Pankhurst's Women's Social and Political Union from 1903, adopted militant tactics: window-smashing, arson, and hunger strikes. The movement exposed deep contradictions in British democracy: a nation that prided itself on liberty denied half its population the vote. Women's contribution to the war effort during 1914-18 finally broke the political deadlock, and the Representation of the People Act 1918 granted the vote to women over 30 who met property qualifications. Full equal suffrage came in 1928.",
            durationMinutes: 22,
          },
        ],
        quiz: {
          id: "quiz_5_2",
          questions: [
            {
              id: "q_5_2_1",
              text: "What did the Mines Act of 1842 do?",
              type: "mcq",
              options: [
                "Banned all child labour",
                "Banned children under 10 from mines",
                "Set minimum wages for miners",
                "Established mine safety inspections",
              ],
              correctIndex: 1,
            },
            {
              id: "q_5_2_2",
              text: "When did women over 30 first gain the right to vote?",
              type: "mcq",
              options: ["1903", "1914", "1918", "1928"],
              correctIndex: 2,
            },
            {
              id: "q_5_2_3",
              text: "Distinguish between the suffragists and the suffragettes in terms of their methods.",
              type: "short-answer",
              modelAnswer:
                "Suffragists (led by Millicent Fawcett, NUWSS) used constitutional methods: petitions, lobbying, public meetings. Suffragettes (led by Emmeline Pankhurst, WSPU from 1903) used militant tactics: window-smashing, arson, hunger strikes. Both sought women's voting rights but disagreed on tactics.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "course_6",
    slug: "english-civil-war",
    title: "The English Civil War",
    summary:
      "King versus Parliament: the conflict that executed a monarch, created a republic, and reshaped the British constitution forever.",
    instructor: "Dr. Andrea Mayberry",
    level: "advanced",
    durationHours: 9,
    heroImageUrl: "/images/courses/english-civil-war.jpg",
    status: "published",
    modules: [
      {
        id: "mod_6_1",
        order: 1,
        title: "Causes and Outbreak",
        summary: "Why did England go to war with itself?",
        lessons: [
          {
            id: "les_6_1_1",
            order: 1,
            title: "The Personal Rule of Charles I",
            contentType: "video",
            muxAssetId: "mux_placeholder_29",
            transcript:
              "Charles I's decision to rule without Parliament from 1629 to 1640 — the period known as the Personal Rule or the 'Eleven Years' Tyranny' — was the proximate cause of the English Civil War. Charles believed in the divine right of kings and regarded parliamentary criticism as bordering on treason. He raised revenue through legally dubious means, most notably Ship Money, a tax traditionally levied on coastal counties in wartime that Charles extended to inland counties in peacetime. When John Hampden refused to pay and was prosecuted in 1637, the case became a cause célèbre. Charles's religious policies were equally provocative: his Archbishop of Canterbury, William Laud, imposed ceremonial innovations that many Puritans regarded as a covert return to Catholicism. The attempt to impose a new prayer book on Scotland in 1637 provoked the Bishops' Wars, which forced Charles to recall Parliament in 1640 — setting in train the events that would lead to civil war.",
            durationMinutes: 28,
          },
          {
            id: "les_6_1_2",
            order: 2,
            title: "The Long Parliament and the Slide to War",
            contentType: "audio",
            muxAssetId: "mux_placeholder_30",
            transcript:
              "The Long Parliament, which first met in November 1640, was initially united in opposition to Charles I's personal rule. Parliament abolished the prerogative courts, executed the king's chief minister the Earl of Strafford, and passed legislation requiring regular parliamentary sessions. But as the crisis deepened, a royalist party began to form around those who feared that Parliament was going too far. The Irish Rebellion of October 1641 — in which thousands of Protestant settlers were killed — created an urgent need for an army, but neither king nor Parliament trusted the other to control it. Charles's attempt to arrest five members of the House of Commons in January 1642 — the most dramatic parliamentary moment in English history — destroyed any remaining trust. By August 1642, both sides were raising armies, and the king raised his standard at Nottingham, formally beginning the war.",
            durationMinutes: 24,
          },
          {
            id: "les_6_1_3",
            order: 3,
            title: "Choosing Sides: A Nation Divided",
            contentType: "text",
            transcript:
              "The English Civil War divided communities, families, and even individuals. The traditional image of Cavaliers (aristocratic Royalists) versus Roundheads (Puritan Parliamentarians) is a gross oversimplification. Support for each side was determined by a complex mix of religion, economics, local politics, and personal loyalty. Generally, the north and west supported the king, while the south and east — including London, the wealthiest city — supported Parliament. The major ports and the navy declared for Parliament, giving it a decisive strategic advantage. Many people tried to remain neutral: the 'clubmen' movements in several counties represented communities that wanted to keep both armies out. The decision to take sides was agonising: Sir Edmund Verney, the king's standard-bearer at Edgehill, confessed that he disagreed with the king's cause but could not bring himself to abandon his sovereign.",
            durationMinutes: 18,
          },
        ],
        quiz: {
          id: "quiz_6_1",
          questions: [
            {
              id: "q_6_1_1",
              text: "How long did Charles I rule without Parliament during the Personal Rule?",
              type: "mcq",
              options: ["5 years", "8 years", "11 years", "15 years"],
              correctIndex: 2,
            },
            {
              id: "q_6_1_2",
              text: "What was Ship Money?",
              type: "mcq",
              options: [
                "A fee for importing goods",
                "A tax for naval defence extended to inland counties",
                "A customs duty on ship-building materials",
                "A fine for merchant vessels",
              ],
              correctIndex: 1,
            },
            {
              id: "q_6_1_3",
              text: "Why was Charles I's attempt to arrest five MPs in January 1642 significant?",
              type: "short-answer",
              modelAnswer:
                "It was the most dramatic violation of parliamentary privilege in English history. It destroyed remaining trust between king and Parliament, as Charles personally entered the Commons with armed soldiers. The MPs had been warned and fled. The incident made armed conflict virtually inevitable.",
            },
          ],
        },
      },
      {
        id: "mod_6_2",
        order: 2,
        title: "War, Republic, and Restoration",
        summary: "From battlefields to regicide to the return of the monarchy",
        lessons: [
          {
            id: "les_6_2_1",
            order: 1,
            title: "Marston Moor and Naseby: Turning Points",
            contentType: "video",
            muxAssetId: "mux_placeholder_31",
            transcript:
              "The battles of Marston Moor (July 1644) and Naseby (June 1645) were the decisive military encounters of the English Civil War. At Marston Moor, the largest battle ever fought on English soil, a combined force of Parliamentarians and Scots defeated the Royalists in a bloody evening engagement. Oliver Cromwell's cavalry, the Ironsides, distinguished themselves by their discipline — charging, regrouping, and charging again rather than pursuing fleeing enemies, as cavalry typically did. Naseby was even more decisive: the New Model Army, Parliament's professional fighting force, destroyed the king's main field army. Charles lost not only the battle but his private correspondence, which was published and revealed his attempts to bring Irish Catholic and foreign troops to England — devastating his remaining support.",
            durationMinutes: 26,
          },
          {
            id: "les_6_2_2",
            order: 2,
            title: "The Trial and Execution of Charles I",
            contentType: "video",
            muxAssetId: "mux_placeholder_32",
            transcript:
              "The trial and execution of Charles I in January 1649 was an event without precedent in European history. After the Second Civil War of 1648 convinced many in the army that Charles could never be trusted to negotiate in good faith, the army purged Parliament of moderate members (Pride's Purge) and established a High Court of Justice to try the king for treason. Charles refused to recognise the court's authority, arguing that a king could not be tried by his own subjects. He was found guilty and sentenced to death. On 30 January 1649, Charles walked through the Banqueting House in Whitehall — past the ceiling painted by Rubens celebrating the divine right of kings — to a scaffold erected outside. He was beheaded with a single blow. The crowd groaned. The execution sent shockwaves across Europe and established the revolutionary principle that rulers could be held accountable.",
            durationMinutes: 30,
          },
          {
            id: "les_6_2_3",
            order: 3,
            title: "Cromwell's Commonwealth and the Restoration",
            contentType: "audio",
            muxAssetId: "mux_placeholder_33",
            transcript:
              "The period between the execution of Charles I and the restoration of Charles II in 1660 saw England experiment with republicanism. Oliver Cromwell, who emerged as the dominant political and military figure, served as Lord Protector from 1653 until his death in 1658. His rule was characterised by religious toleration (for Protestants), military efficiency, and an aggressive foreign policy that saw English forces conquer Jamaica and humiliate the Dutch and Spanish navies. But the Protectorate failed to establish a stable constitutional settlement, and when Cromwell died his son Richard proved unable to maintain authority. By 1660, the country was ready for the return of the monarchy, and Charles II was restored amidst general rejoicing. The Restoration settlement established a constitutional monarchy in which the king ruled with Parliament, not despite it — the fundamental legacy of the Civil War.",
            durationMinutes: 24,
          },
        ],
        quiz: {
          id: "quiz_6_2",
          questions: [
            {
              id: "q_6_2_1",
              text: "When was Charles I executed?",
              type: "mcq",
              options: ["30 January 1647", "30 January 1649", "30 January 1651", "30 January 1653"],
              correctIndex: 1,
            },
            {
              id: "q_6_2_2",
              text: "What was the New Model Army?",
              type: "mcq",
              options: [
                "A royalist volunteer force",
                "Parliament's professional standing army",
                "A Scottish mercenary army",
                "A militia of London apprentices",
              ],
              correctIndex: 1,
            },
            {
              id: "q_6_2_3",
              text: "What was Pride's Purge?",
              type: "short-answer",
              modelAnswer:
                "In December 1648, Colonel Thomas Pride used soldiers to prevent moderate MPs from entering Parliament, removing those who wanted to continue negotiating with Charles I. This left a 'Rump Parliament' of around 75 members who were willing to put the king on trial.",
            },
            {
              id: "q_6_2_4",
              text: "Why did the republican experiment ultimately fail?",
              type: "short-answer",
              modelAnswer:
                "Cromwell's Protectorate failed to establish a stable constitutional settlement and depended too heavily on military force and Cromwell's personal authority. When he died in 1658, his son Richard lacked the political and military credibility to maintain power, and the country reverted to monarchy in 1660.",
            },
          ],
        },
      },
    ],
  },
];

export const SEED_READING_LISTS: Record<string, ReadingListItem[]> = {
  "tudor-dynasty": [
    {
      id: "book_1_1",
      title: "The Tudors: The Complete Story of England's Most Notorious Dynasty",
      author: "G.J. Meyer",
      bookshopUrl: "https://bookshop.org/p/books/the-tudors-g-j-meyer/6437158",
      amazonUrl: "https://www.amazon.co.uk/dp/0385340761",
    },
    {
      id: "book_1_2",
      title: "The Life of Elizabeth I",
      author: "Alison Weir",
      bookshopUrl: "https://bookshop.org/p/books/the-life-of-elizabeth-i-alison-weir/6708940",
      amazonUrl: "https://www.amazon.co.uk/dp/0345425502",
    },
    {
      id: "book_1_3",
      title: "Wolf Hall",
      author: "Hilary Mantel",
      bookshopUrl: "https://bookshop.org/p/books/wolf-hall-hilary-mantel/7070472",
      amazonUrl: "https://www.amazon.co.uk/dp/0312429983",
    },
    {
      id: "book_1_4",
      title: "The Six Wives of Henry VIII",
      author: "Alison Weir",
      bookshopUrl: "https://bookshop.org/p/books/the-six-wives-of-henry-viii-alison-weir/6708938",
      amazonUrl: "https://www.amazon.co.uk/dp/0802197639",
    },
    {
      id: "book_1_5",
      title: "A Very Short Introduction to the Tudors",
      author: "John Guy",
      bookshopUrl: "https://bookshop.org/p/books/the-tudors-john-guy/234567",
      amazonUrl: "https://www.amazon.co.uk/dp/0199674725",
    },
  ],
  "roman-britain": [
    {
      id: "book_2_1",
      title: "SPQR: A History of Ancient Rome",
      author: "Mary Beard",
      bookshopUrl: "https://bookshop.org/p/books/spqr-mary-beard/6802612",
      amazonUrl: "https://www.amazon.co.uk/dp/1631492225",
    },
    {
      id: "book_2_2",
      title: "Britannia: The Failed State",
      author: "Stuart Laycock",
      bookshopUrl: "https://bookshop.org/p/books/britannia-stuart-laycock/234568",
      amazonUrl: "https://www.amazon.co.uk/dp/0752460900",
    },
    {
      id: "book_2_3",
      title: "The Roman Invasion of Britain",
      author: "Graham Webster",
      bookshopUrl: "https://bookshop.org/p/books/the-roman-invasion-graham-webster/234569",
      amazonUrl: "https://www.amazon.co.uk/dp/0415152135",
    },
    {
      id: "book_2_4",
      title: "Roman Britain: A Very Short Introduction",
      author: "Peter Salway",
      bookshopUrl: "https://bookshop.org/p/books/roman-britain-peter-salway/234570",
      amazonUrl: "https://www.amazon.co.uk/dp/0192854046",
    },
    {
      id: "book_2_5",
      title: "Vindolanda: A Roman Frontier Fort on Hadrian's Wall",
      author: "Robin Birley",
      bookshopUrl: "https://bookshop.org/p/books/vindolanda-robin-birley/234571",
      amazonUrl: "https://www.amazon.co.uk/dp/1848689632",
    },
    {
      id: "book_2_6",
      title: "Eagle of the Ninth",
      author: "Rosemary Sutcliff",
      bookshopUrl: "https://bookshop.org/p/books/eagle-of-the-ninth-rosemary-sutcliff/234572",
      amazonUrl: "https://www.amazon.co.uk/dp/0192753924",
    },
  ],
  "wwii-home-front": [
    {
      id: "book_3_1",
      title: "The People's War: Britain 1939-1945",
      author: "Angus Calder",
      bookshopUrl: "https://bookshop.org/p/books/the-peoples-war-angus-calder/234573",
      amazonUrl: "https://www.amazon.co.uk/dp/0712668004",
    },
    {
      id: "book_3_2",
      title: "Wartime: Britain 1939-1945",
      author: "Juliet Gardiner",
      bookshopUrl: "https://bookshop.org/p/books/wartime-juliet-gardiner/234574",
      amazonUrl: "https://www.amazon.co.uk/dp/0755310284",
    },
    {
      id: "book_3_3",
      title: "The Blitz: The British Under Attack",
      author: "Juliet Gardiner",
      bookshopUrl: "https://bookshop.org/p/books/the-blitz-juliet-gardiner/234575",
      amazonUrl: "https://www.amazon.co.uk/dp/0007384580",
    },
    {
      id: "book_3_4",
      title: "Goodnight Mister Tom",
      author: "Michelle Magorian",
      bookshopUrl: "https://bookshop.org/p/books/goodnight-mister-tom-michelle-magorian/234576",
      amazonUrl: "https://www.amazon.co.uk/dp/0141354801",
    },
    {
      id: "book_3_5",
      title: "Millions Like Us: Women's Lives During the Second World War",
      author: "Virginia Nicholson",
      bookshopUrl: "https://bookshop.org/p/books/millions-like-us-virginia-nicholson/234577",
      amazonUrl: "https://www.amazon.co.uk/dp/0670917563",
    },
  ],
  "medieval-england": [
    {
      id: "book_4_1",
      title: "The Time Traveller's Guide to Medieval England",
      author: "Ian Mortimer",
      bookshopUrl: "https://bookshop.org/p/books/time-travellers-guide-ian-mortimer/234578",
      amazonUrl: "https://www.amazon.co.uk/dp/1845950992",
    },
    {
      id: "book_4_2",
      title: "A Distant Mirror: The Calamitous 14th Century",
      author: "Barbara Tuchman",
      bookshopUrl: "https://bookshop.org/p/books/a-distant-mirror-barbara-tuchman/234579",
      amazonUrl: "https://www.amazon.co.uk/dp/0345349571",
    },
    {
      id: "book_4_3",
      title: "The Plantagenets",
      author: "Dan Jones",
      bookshopUrl: "https://bookshop.org/p/books/the-plantagenets-dan-jones/234580",
      amazonUrl: "https://www.amazon.co.uk/dp/0143124927",
    },
    {
      id: "book_4_4",
      title: "The Norman Conquest",
      author: "Marc Morris",
      bookshopUrl: "https://bookshop.org/p/books/the-norman-conquest-marc-morris/234581",
      amazonUrl: "https://www.amazon.co.uk/dp/0099537427",
    },
    {
      id: "book_4_5",
      title: "Medieval Lives: Eight Charismatic Men and Women of the Middle Ages",
      author: "Norman Cantor",
      bookshopUrl: "https://bookshop.org/p/books/medieval-lives-norman-cantor/234582",
      amazonUrl: "https://www.amazon.co.uk/dp/0060925795",
    },
    {
      id: "book_4_6",
      title: "The Great Mortality: An Intimate History of the Black Death",
      author: "John Kelly",
      bookshopUrl: "https://bookshop.org/p/books/the-great-mortality-john-kelly/234583",
      amazonUrl: "https://www.amazon.co.uk/dp/0007150709",
    },
  ],
  "victorian-age": [
    {
      id: "book_5_1",
      title: "The Victorian City: Everyday Life in Dickens' London",
      author: "Judith Flanders",
      bookshopUrl: "https://bookshop.org/p/books/the-victorian-city-judith-flanders/234584",
      amazonUrl: "https://www.amazon.co.uk/dp/1848879083",
    },
    {
      id: "book_5_2",
      title: "The Victorians",
      author: "A.N. Wilson",
      bookshopUrl: "https://bookshop.org/p/books/the-victorians-an-wilson/234585",
      amazonUrl: "https://www.amazon.co.uk/dp/0099451875",
    },
    {
      id: "book_5_3",
      title: "Suffragette: My Own Story",
      author: "Emmeline Pankhurst",
      bookshopUrl: "https://bookshop.org/p/books/suffragette-emmeline-pankhurst/234586",
      amazonUrl: "https://www.amazon.co.uk/dp/1843914808",
    },
    {
      id: "book_5_4",
      title: "The Age of Empire: 1875-1914",
      author: "Eric Hobsbawm",
      bookshopUrl: "https://bookshop.org/p/books/age-of-empire-eric-hobsbawm/234587",
      amazonUrl: "https://www.amazon.co.uk/dp/0349105987",
    },
    {
      id: "book_5_5",
      title: "North and South",
      author: "Elizabeth Gaskell",
      bookshopUrl: "https://bookshop.org/p/books/north-and-south-elizabeth-gaskell/234588",
      amazonUrl: "https://www.amazon.co.uk/dp/0140434240",
    },
    {
      id: "book_5_6",
      title: "The Invention of Murder",
      author: "Judith Flanders",
      bookshopUrl: "https://bookshop.org/p/books/the-invention-of-murder-judith-flanders/234589",
      amazonUrl: "https://www.amazon.co.uk/dp/0007248903",
    },
  ],
  "english-civil-war": [
    {
      id: "book_6_1",
      title: "God's Englishman: Oliver Cromwell and the English Revolution",
      author: "Christopher Hill",
      bookshopUrl: "https://bookshop.org/p/books/gods-englishman-christopher-hill/234590",
      amazonUrl: "https://www.amazon.co.uk/dp/0141390204",
    },
    {
      id: "book_6_2",
      title: "The English Civil War: A People's History",
      author: "Diane Purkiss",
      bookshopUrl: "https://bookshop.org/p/books/english-civil-war-diane-purkiss/234591",
      amazonUrl: "https://www.amazon.co.uk/dp/0007150628",
    },
    {
      id: "book_6_3",
      title: "Killers of the King",
      author: "Charles Spencer",
      bookshopUrl: "https://bookshop.org/p/books/killers-of-the-king-charles-spencer/234592",
      amazonUrl: "https://www.amazon.co.uk/dp/1408851776",
    },
    {
      id: "book_6_4",
      title: "The World Turned Upside Down",
      author: "Christopher Hill",
      bookshopUrl: "https://bookshop.org/p/books/world-turned-upside-down-christopher-hill/234593",
      amazonUrl: "https://www.amazon.co.uk/dp/0140137327",
    },
    {
      id: "book_6_5",
      title: "A Coffin for King Charles",
      author: "C.V. Wedgwood",
      bookshopUrl: "https://bookshop.org/p/books/coffin-for-king-charles-cv-wedgwood/234594",
      amazonUrl: "https://www.amazon.co.uk/dp/1590176030",
    },
    {
      id: "book_6_6",
      title: "The Tyrannicide Brief",
      author: "Geoffrey Robertson",
      bookshopUrl: "https://bookshop.org/p/books/tyrannicide-brief-geoffrey-robertson/234595",
      amazonUrl: "https://www.amazon.co.uk/dp/0099459205",
    },
    {
      id: "book_6_7",
      title: "An Equal Music",
      author: "Anna Keay",
      bookshopUrl: "https://bookshop.org/p/books/the-restless-republic-anna-keay/234596",
      amazonUrl: "https://www.amazon.co.uk/dp/0008282056",
    },
  ],
};
