import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvent } from '../services/api';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';

export default function EventDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const data = await getEvent(id);
      setItem(data);
    })();
  }, [id]);

  if (!item) return <div className="p-8">Loading...</div>;
  return (
    <div>
      {item.template === 'modern'
        ? <ModernTemplate item={item} />
        : <ClassicTemplate item={item} />
      }
      <div className="p-4 text-center">
        <Link to={`/edit/${item.id}`} className="btn">Edit Event</Link>
      </div>
    </div>
  );
}