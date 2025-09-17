import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/logo.png',
  url,
  type = 'website',
  author = 'AniLife Healthcare',
  publishedTime,
  modifiedTime 
}) => {
  const defaultTitle = "AniLife Healthcare - Leading Animal Nutrition Supplement Company";
  const defaultDescription = "Leading animal nutrition supplement company specializing in high-quality supplements for cattle, aquaculture, poultry, and pets. Located in Visnagar, Gujarat.";
  const defaultKeywords = "animal nutrition supplements, cattle supplements, aquaculture supplements, poultry supplements, pet supplements, livestock health, animal healthcare, Gujarat";
  
  const siteUrl = "https://anilifehealthcare.com";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullTitle = title ? `${title} | AniLife Healthcare` : defaultTitle;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content="AniLife Healthcare" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
};

export default SEO;
