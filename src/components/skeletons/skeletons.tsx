import { StyledGreetingDescription } from '@/components/home/greeting';
import { SkeletonItem } from '@/components/skeletons/skeletons.style';
import { StyledHeading } from '@/pages/rollingpaper/setup.style';

export function MyProfileSkeleton() {
  return (
    <div css={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
      <div>
        <SkeletonItem
          css={{ width: '48px', height: '48px', borderRadius: '9999px' }}
        />
      </div>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2px',
        }}
      >
        <SkeletonItem css={{ width: '70px', height: '20px' }} />
        <SkeletonItem css={{ width: '150px', height: '16px' }} />
      </div>
    </div>
  );
}

export function GreetingSkeleton() {
  return (
    <StyledHeading>
      <SkeletonItem
        css={{ height: '25px', width: '160px', display: 'inline-block' }}
      />
      <StyledGreetingDescription>
        <strong>다양한 컨텐츠</strong>를 즐겨보세요.
      </StyledGreetingDescription>
    </StyledHeading>
  );
}

export function MyMessageListSkeleton() {
  return (
    <div
      css={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      {Array(8)
        .fill('1')
        .map((_, index) => (
          <SkeletonItem css={{ height: '180px' }} key={index} />
        ))}
    </div>
  );
}

export function MyPaperListSkeleton() {
  return (
    <div
      css={{
        display: 'flex',
        gap: '8px',
        flexDirection: 'column',
      }}
    >
      {Array(8)
        .fill('1')
        .map((_, index) => (
          <SkeletonItem css={{ height: '80px' }} key={index} />
        ))}
    </div>
  );
}

// export function HeaderSkeleton() {
//   return (
//     <StyledHeader headerColor={theme.colors.white} hasBorder={true}>
//       <div>
//         <SkeletonItem css={{ width: '32px', height: '32px' }} />
//         <SkeletonItem css={{ width: '170px', height: '30px' }} />
//         <SkeletonItem css={{ width: '32px', height: '32px' }} />
//       </div>
//     </StyledHeader>
//   );
// }
