import type { NextPage } from 'next'
import { useState, Dispatch, SetStateAction } from "react";
import { Button, ButtonGroup, Center, Wrap, WrapItem } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'

enum CardType {
  Good,
  Bad,
  Improvement,
  SprintStar
}

const PLACEHOLDER = "_____";

type Card = {
  type: CardType;
  content: string;
}

const cards: Card[] = [
  {
    type: CardType.Good,
    content: "We were into _____ before it was cool."
  },
  {
    type: CardType.Good,
    content: "The Colonel's secret spice contains _____."
  },
  {
    type: CardType.Good,
    content: "I love the smell of _____ in the morning."
  },
  {
    type: CardType.Good,
    content: "_____ was so good even Grumpy Cat smiled."
  },
  {
    type: CardType.Good,
    content: "_____ is my chosen weapon in the zombie apocalypse."
  },
  {
    type: CardType.Good,
    content: "The secret weapon in the war against bad sprints is _____."
  },
  {
    type: CardType.Good,
    content: "_____ was all the things, to all the people."
  },
  {
    type: CardType.Good,
    content: "The secret to a good sprint they don’t want you to know about is _____."
  },
  {
    type: CardType.Good,
    content: "More beautiful than a double rainbow; when _____ just works."
  },
  {
    type: CardType.Good,
    content: "I'll tell you what I want, what I really really want: _____."
  },
  {
    type: CardType.Good,
    content: "I want to shout it from the rooftops. I love _____."
  },
  {
    type: CardType.Bad,
    content: "_____ is the modern-day Betamax."
  },
  {
    type: CardType.Bad,
    content: "The tenth circle of hell is made up of _____."
  },
  {
    type: CardType.Bad,
    content: "_____ keeps me up at night."
  },
  {
    type: CardType.Bad,
    content: "Ain't nobody got time for _____."
  },
  {
    type: CardType.Bad,
    content: "_____ is more offensive than the teeth of a Jeremy Kyle guest."
  },
  {
    type: CardType.Bad,
    content: "I wouldn't wish _____ on my worst enemy."
  },
  {
    type: CardType.Bad,
    content: "Don't feed gizmo after midnight or you may end up with ______."
  },
  {
    type: CardType.Bad,
    content: "Drawing a perfect circle on an etch a sketch is easier than ______."
  },
  {
    type: CardType.Bad,
    content: "The only thing I regret is _____."
  },
  {
    type: CardType.Bad,
    content: "_____ should be sent to bed without supper."
  },
  {
    type: CardType.Bad,
    content: "If only we'd known about _____ sooner."
  },
  {
    type: CardType.Improvement,
    content: "Hexagon don't currently _____, but if they did, they'd be the best in the world."
  },
  {
    type: CardType.Improvement,
    content: "______: what's the worst that could happen?"
  },
  {
    type: CardType.Improvement,
    content: "I'm 100% sure, except for maybe ______."
  },
  {
    type: CardType.Improvement,
    content: "_____ could save the world. Or it could kill us all."
  },
  {
    type: CardType.Improvement,
    content: "I like to try new things, but is ______ really the answer?"
  },
  {
    type: CardType.Improvement,
    content: "_____ didn't go exactly how I'd have liked. But it worked."
  },
  {
    type: CardType.Improvement,
    content: "____ surprised me more than Chris Evans leaving Top Gear."
  },
  {
    type: CardType.Improvement,
    content: "I figured it all out, but _____ still baffles me."
  },
  {
    type: CardType.Improvement,
    content: "______ confused us more than Opal Fruits changing to Starburst."
  },
  {
    type: CardType.Improvement,
    content: "Why didn't we think of _____ sooner?"
  },
  {
    type: CardType.Improvement,
    content: "Who could have guessed that _____ would be a thing this sprint?"
  },
  {
    type: CardType.SprintStar,
    content: "No one puts ______ in the corner."
  },
  {
    type: CardType.SprintStar,
    content: "______ is a one man/woman army."
  },
  {
    type: CardType.SprintStar,
    content: "The name's Bond. ______ Bond."
  },
  {
    type: CardType.SprintStar,
    content: "Who you gonna call? ______!"
  },
  {
    type: CardType.SprintStar,
    content: "Even Chuck Norris bows down to ______."
  },
  {
    type: CardType.SprintStar,
    content: "I'd take ______ home to meet the parents."
  },
  {
    type: CardType.SprintStar,
    content: "Nothing compares 2 ______."
  },
  {
    type: CardType.SprintStar,
    content: "Always be yourself, unless you can be ______."
  },
  {
    type: CardType.SprintStar,
    content: "______: not the hero we want, but the hero we definitely need."
  },
  {
    type: CardType.SprintStar,
    content: "I'd recommend ______ to a friend."
  },
  {
    type: CardType.SprintStar,
    content: "______ is an unstoppable sprint beast."
  },
]

const shuffle = <T,>(array: T[]): T[] => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const Home: NextPage = () => {
  const [badCards, setBadCards] = useState<Card[]>([]);
  const [drawnBadCards, setDrawnBadCards] = useState<Card[]>([]);
  const [goodCards, setGoodCarads] = useState<Card[]>([]);
  const [drawnGoodCards, setDrawnGoodCarads] = useState<Card[]>([]);
  const [improvementCards, setImprovementCards] = useState<Card[]>([]);
  const [drawnImprovementCards, setDrawnImprovementCards] = useState<Card[]>([]);
  const [sprintStarCards, setSprintStarCards] = useState<Card[]>([]);
  const [drawnSprintStarCards, setDrawnSprintStarCards] = useState<Card[]>([]);

  const shuffleCards = (type: CardType): Card[] => {
      return shuffle(cards.filter(c => c.type === type));
  }

  const drawCard = (cards: Card[], setDeck: Dispatch<SetStateAction<Card[]>> ): Card => {
    const deck = [...cards];
    const card = deck.splice(-1, 1)[0];    
    setDeck(deck);
    return card;
  }

  const shuffleGoodCards = () => {
    const cards = shuffleCards(CardType.Good);
    setGoodCarads(cards);
    setDrawnGoodCarads([]);
  }

  const drawGoodCard = () => {
    const card = drawCard(goodCards, setGoodCarads);
    setDrawnGoodCarads([...drawnGoodCards, card]);
  }

  const shuffleBadCards = () => {
    const cards = shuffleCards(CardType.Bad);
    setBadCards(cards);
    setDrawnBadCards([]);
  }

  const drawBadCard = () => {
    const card = drawCard(badCards, setBadCards);
    setDrawnBadCards([...drawnBadCards, card]);
  }

  const shuffleImprovementCards = () => {
    const cards = shuffleCards(CardType.Improvement);
    setImprovementCards(cards);
    setDrawnImprovementCards([]);
  }

  const drawImprovementCard = () => {
    const card = drawCard(improvementCards, setImprovementCards);
    setDrawnImprovementCards([...drawnImprovementCards, card]);
  }

  const shuffleSprintStarCards = () => {
    const cards = shuffleCards(CardType.SprintStar);
    setSprintStarCards(cards);
    setDrawnSprintStarCards([]);
  }

  const drawSprintStarCard = () => {
    const card = drawCard(sprintStarCards, setSprintStarCards);
    setDrawnSprintStarCards([...drawnSprintStarCards, card]);
  }

  return (
    <Container>
      <Tabs size="lg" variant='enclosed'>
        <TabList>
          <Tab>Good</Tab>
          <Tab>Bad</Tab>
          <Tab>Improvement</Tab>
          <Tab>Sprint Star</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack direction="column">
              <Button colorScheme='red' size='lg' onClick={shuffleGoodCards}>
                Shuffle
              </Button>
              <Button colorScheme='blue' size='lg' onClick={drawGoodCard} disabled={goodCards.length < 1}>
                Draw
              </Button>           
              <Wrap>
                  { drawnGoodCards.map((c, i) => <WrapItem key={i}>
                    <ScaleFade in={true}><Center w="150px" h="300px" bg="green.100">{c.content}</Center></ScaleFade>
                    </WrapItem>)}
                </Wrap>
            </Stack>            
          </TabPanel>
          <TabPanel>
            <Stack direction="column">
              <Button colorScheme='red' size='lg' onClick={shuffleBadCards}>
                Shuffle
              </Button>
              <Button colorScheme='blue' size='lg' onClick={drawBadCard} disabled={badCards.length < 1}>
                Draw
              </Button>           
              <Wrap>
                  { drawnBadCards.map((c, i) => <WrapItem key={i}>
                  <ScaleFade in={true}>
                    <Center w="150px" h="300px" bg="red.100">{c.content}</Center>
                    </ScaleFade>
                    </WrapItem>)}
                </Wrap>
            </Stack>   
          </TabPanel>
          <TabPanel>
            <Stack direction="column">
              <Button colorScheme='red' size='lg' onClick={shuffleImprovementCards}>
                Shuffle
              </Button>
              <Button colorScheme='blue' size='lg' onClick={drawImprovementCard} disabled={improvementCards.length < 1}>
                Draw
              </Button>           
              <Wrap>
                  { drawnImprovementCards.map((c, i) => <WrapItem key={i}>
                  <ScaleFade in={true}>
                    <Center w="150px" h="300px" bg="blue.100">{c.content}</Center>
                    </ScaleFade>
                    </WrapItem>)}
                </Wrap>
            </Stack>  
          </TabPanel>
          <TabPanel>
          <Stack direction="column">
              <Button colorScheme='red' size='lg' onClick={shuffleSprintStarCards}>
                Shuffle
              </Button>
              <Button colorScheme='blue' size='lg' onClick={drawSprintStarCard} disabled={sprintStarCards.length < 1}>
                Draw
              </Button>           
              <Wrap>
                  { drawnSprintStarCards.map((c, i) => <WrapItem key={i}>
                    
                  <ScaleFade in={true}><Center w="150px" h="300px" bg="yellow.100">{c.content}</Center></ScaleFade>
                  </WrapItem>)}
                </Wrap>
            </Stack>  
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default Home
