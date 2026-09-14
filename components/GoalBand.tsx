import { goal } from '../content/homepage';
import Band from './Band';
import Personas from './Personas';

export default function GoalBand() {
  return (
    <Band
      id="pathway"
      headline={goal.headline}
      paragraphs={[goal.body]}
      media={<Personas />}
      links={goal.links}
    />
  );
}
