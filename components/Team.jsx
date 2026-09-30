import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { User } from 'lucide-react';

const TeamMemberAvatar = ({ avatar, name, isFounder }) => {
  const [imgError, setImgError] = useState(false);

  if (avatar && !imgError) {
    return (
      <div className={`${
        isFounder ? 'w-20 h-20' : 'w-14 h-14'
      } rounded-full overflow-hidden border-2 border-blue-100 dark:border-blue-900/30 group-hover:scale-105 transition-transform flex-shrink-0`}>
        <img
          src={`${import.meta.env.BASE_URL}${avatar}`}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${
      isFounder ? 'w-20 h-20' : 'w-14 h-14'
    } rounded-full border-2 border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0`}>
      <User className={isFounder ? 'h-10 w-10 text-blue-600' : 'h-7 w-7 text-blue-600'} />
    </div>
  );
};

export const Team = () => {
  const leadership = [
    {
      name: 'Ramesh Botta',
      role: 'Founder',
      avatar: 'ramesh.jpg',
      bio: '13+ years in End-to-End BI solutions across Retail, Banking, Gaming & Digital Media. Passionate about Data Science, Data Engineering & ML.',
      badges: [
        { text: '✓ TDWI Certified', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
        { text: '🎯 Innovator Finalist', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' }
      ],
      skills: ['Data Engineering', 'ETL', 'Data Modeling', 'Advanced Analytics', 'Data Science', 'ML', 'Dashboard Design']
    },
    {
      name: 'Sunny Dona Daliboina',
      role: 'COO',
      avatar: 'sunny.jpg',
      bio: '16+ years across Canara Bank & ICICI Bank driving AI Product Management, Risk Analytics & Enterprise Data Platforms. Led 37-member AI teams, unlocked ₹3,750+ Cr in business revenue, recovered ₹102 Cr in unbilled leakage, and scaled GenAI across 7,500 branches.',
      badges: [
        { text: '🏛️ Ex-Canara & ICICI Bank', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
        { text: '📈 ₹3,750+ Cr Revenue Impact', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
        { text: '🎯 ₹102 Cr Leakage Recovery', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' }
      ],
      skills: ['AI Product Management', 'Revenue Optimization', 'Generative AI & LLMs', 'Credit & Risk Analytics', 'Enterprise Data Lakehouse', 'Commercial Strategy', 'Fintech & Banking', 'Cross-Functional Leadership']
    }
  ];

  const engineers = [
    {
      name: 'Hymavathi Peddimudi',
      role: 'Junior SDE (Founding)',
      specialty: 'Full Stack Development · Product Engineering · UI/UX',
      avatar: 'hyma.jpg'
    },
    {
      name: 'Hemakesh Surla',
      role: 'Junior SDE (Founding)',
      specialty: 'Full Stack Development · Cloud & DevOps · System Architecture',
      avatar: 'hemakesh.jpg'
    }
  ];

  return (
    <section id="team" className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Leadership Team
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Meet the experienced leaders guiding our vision, innovation, and strategic growth.
          </p>
        </div>

        {/* Leadership */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {leadership.map((leader, index) => (
            <Card key={index} className="border-border/50 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg group w-full">
              <CardContent className="py-5 px-6">
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <TeamMemberAvatar avatar={leader.avatar} name={leader.name} isFounder={true} />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold">{leader.name}</h3>
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] px-2 py-0">
                        {leader.role}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2">
                      {leader.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {leader.badges.map((badge, bIndex) => (
                        <span key={bIndex} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${badge.className}`}>
                          {badge.text}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {leader.skills.map((skill, sIndex) => (
                        <span key={sIndex} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Engineers Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">Founding Engineers</h3>
            <p className="text-muted-foreground">
              Young, energetic graduates focused on executing the product vision with technical excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {engineers.map((engineer, index) => (
              <Card key={index} className="border-border/50 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="pt-6 flex items-start space-x-4">
                  <TeamMemberAvatar avatar={engineer.avatar} name={engineer.name} isFounder={false} />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{engineer.name}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{engineer.role}</p>
                    <p className="text-sm text-muted-foreground">{engineer.specialty}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
