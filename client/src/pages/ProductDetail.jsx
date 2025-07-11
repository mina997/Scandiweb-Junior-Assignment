import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_PRODUCT } from '../graphql/queries';
import {
  Error,
  Loading,
  ProductAttributes,
  ProductImageCarousel,
} from '../components';
import ErrorScreen from './ErrorScreen';

function ProductDetail() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id },
  });

  if (error) {
    return error.networkError ? (
      <Error
        statusCode={error.networkError.statusCode}
        message="Product not found"
      />
    ) : (
      <ErrorScreen />
    );
  }

  if (loading) {
    return <Loading />;
  }

  const { product } = data;

  return (
    <main
      className="flex flex-col items-start mt-14 md:flex-row"
      data-testid={`product-${product.name.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <ProductImageCarousel images={product.gallery} alt={product.name} />

      <ProductAttributes className="md:w-1/3 md:pl-4" product={product} />
    </main>
  );
}

export default ProductDetail;
