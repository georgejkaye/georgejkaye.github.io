import csv, sys

def generate_markdown(table) :
    if(table == []) :
        
        week = ''
        correct = False

        while (not correct) :

            week = input('gameweek? ')

            if(week.isdigit()) :
                if(int(week) < 38 and int(week) > 2):
                    correct = True

            with open('table-' + week + '.txt') as f :

                for line in f :

                    if(line[-1:] == '\n') :
                        line = line[:-1]

                    team = line.split(', ')
                    table.append(team)  
                    
    with open('markdown.md', 'w') as f:
        
        f.write('|    | **Team** | **W** | **D** | **L** | **S** | **Pts** |\n')
        f.write('|:--:|:--------:|:------|:-----:|:-----:|:-----:|:-------:|\n')
        
        for team in table :
            
            img = ''
            
            if team[0] == 's' :
                img = '![s](/images/football/s.webp){: .icon}'
            elif team[0] == 'u' :
                img = '![u](/images/football/u.webp){: .icon}'
            elif team[0] == 'd' :
                img = '![d](/images/football/d.webp){: .icon}'
                
            string = '| ' + img
            
            for bit in team[1:] :
                string = string + ' | ' + str(bit)
            
            string = string + ' |\n'
            
            f.write(string)
        
                
def generate_table() :

    week = ''
    correct = False

    while (not correct) :

        week = input('gameweek? ')

        if(week.isdigit()) :
            if(int(week) < 38 and int(week) > 2):
                correct = True

    fixtures = []

    with open('fixtures/' + week + '.txt') as f :

        for line in f :

            if(line[-1:] == '\n') :
                line = line[:-1]

            match = line.split(', ')
            fixtures.append(match)

    table = []
    newtable = []       

    with open('table-' + str(int(week) - 1) + '.txt') as f :  

        for line in f :

            table.append(line[:-1].split(', '))

    def insert_into_table(team, points, result) :

            newteam = None

            for oldteam in table :
                if oldteam[1] == team :

                    print(oldteam)

                    newteam = oldteam

                    if (result == 'w') :
                        newteam[2] = int(oldteam[2]) + 1
                        newteam[3] = int(oldteam[3]) + 0
                        newteam[4] = int(oldteam[4]) + 0
                        newteam[6] = int(oldteam[6]) + 3
                    elif (result == 'd') :
                        newteam[2] = int(oldteam[2]) + 0
                        newteam[3] = int(oldteam[3]) + 1
                        newteam[4] = int(oldteam[4]) + 0
                        newteam[6] = int(oldteam[6]) + 1
                    else :
                        newteam[2] = int(oldteam[2]) + 0
                        newteam[3] = int(oldteam[3]) + 0
                        newteam[4] = int(oldteam[4]) + 1
                        newteam[6] = int(oldteam[6]) + 0

                    newteam[5] = int(oldteam[5]) + points

            i = 0

            inserted = False

            if (newtable == []) :
                newtable.insert(0, newteam)
            else :

                for nteam in newtable :
                    if(not inserted) :

                        if(nteam[6] == newteam[6]) :
                            if(nteam[5] < newteam[5]) :
                                newtable.insert(i, newteam)
                                inserted = True
                        elif(nteam[6] < newteam[6]) :
                            newtable.insert(i, newteam)
                            inserted = True
                    i = i + 1

                if(not inserted) :        
                    newtable.append(newteam) 


    with open('table-' + week + '.txt', 'w') as f:

        for match in fixtures :
            print('\n' + match[0] + ' vs ' + match[1])
            print('------------------------------------------------------------')

            home = ''

            while(not home.isdigit()) :
                home = input(match[0] + ' score? ')

            away = ''

            while(not away.isdigit()) :
                away = input(match[1] + ' score? ')

            print('\n' + match[0] + ' ' + home + ' - ' + away + ' ' + match[1])

            home = int(home)
            away = int(away)

            homeres = 'w'
            awayres = 'l'
            winner = match[0]

            if(home < away) :
                winner = match[1]
                homeres = 'l'
                awayres = 'w'

                print (winner + ' victory')

            elif (home == away) :
                homeres = 'd'
                awayres = 'd'

                print ('draw')

            else :

                print(winner + ' victory')


            insert_into_table(match[0], home, homeres)
            insert_into_table(match[1], away, awayres)


        for team in newtable :
            old = table.index(team)
            new = newtable.index(team)

            change = 's'

            if(old < new) :
                change = 'd'

            if(new < old) :
                change = 'u'

            team[0] = change

            string = ''

            for bit in team :
                string = string + ', ' + str(bit)

            f.write(string[2:])
            f.write('\n')
            
        yeno = input('generate markdown? y/n')
        
        if(yeno == 'y') :
            generate_markdown(newtable)

if(not len(sys.argv) == 2) :
    print ('not enough arguments')
    sys.exit(1)

if(sys.argv[1] == '-gw') :
    generate_table()
elif(sys.argv[1] == '-md') :
    generate_markdown([])



